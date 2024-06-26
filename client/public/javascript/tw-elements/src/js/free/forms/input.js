import { element, onDOMContentLoaded, typeCheckConfig } from "../../util/index";
import Data from "../../dom/data";
import EventHandler from "../../dom/event-handler";
import Manipulator from "../../dom/manipulator";
import SelectorEngine from "../../dom/selector-engine";
import "detect-autofill";

/*
------------------------------------------------------------------------
Constants
------------------------------------------------------------------------
*/

const NAME = "input";
const DATA_KEY = "twe.input";
const DATA_WRAPPER = "data-twe-input-wrapper-init";
const DATA_NOTCH = "data-twe-input-notch-ref";
const DATA_NOTCH_LEADING = "data-twe-input-notch-leading-ref";
const DATA_NOTCH_MIDDLE = "data-twe-input-notch-middle-ref";
const DATA_NOTCH_TRAILING = "data-twe-input-notch-trailing-ref";
const DATA_HELPER = "data-twe-input-helper-ref";
const DATA_PLACEHOLDER_ACTIVE = "data-twe-input-placeholder-active";
const DATA_ACTIVE = "data-twe-input-state-active";
const DATA_FOCUSED = "data-twe-input-focused";
const DATA_FORM_COUNTER = "data-twe-input-form-counter";

const SELECTOR_OUTLINE_INPUT = `[${DATA_WRAPPER}] input`;
const SELECTOR_OUTLINE_TEXTAREA = `[${DATA_WRAPPER}] textarea`;

const SELECTOR_NOTCH = `[${DATA_NOTCH}]`;
const SELECTOR_NOTCH_LEADING = `[${DATA_NOTCH_LEADING}]`;
const SELECTOR_NOTCH_MIDDLE = `[${DATA_NOTCH_MIDDLE}]`;
const SELECTOR_HELPER = `[${DATA_HELPER}]`;

const Default = {
  inputFormWhite: false,
};

const DefaultType = {
  inputFormWhite: "(boolean)",
};

export const DefaultClasses = {
  notch:
    "group flex absolute left-0 top-0 w-full max-w-full h-full text-left pointer-events-none",
  notchLeading:
    "pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none left-0 top-0 h-full w-2 border-e-0 rounded-s-[0.25rem] group-data-[twe-input-focused]:border-e-0 group-data-[twe-input-state-active]:border-e-0",
  notchLeadingNormal:
    "border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:shadow-notch-1 group-data-[twe-input-focused]:border-primary",
  notchLeadingWhite:
    "border-neutral-200 group-data-[twe-input-focused]:shadow-notch-1 group-data-[twe-input-focused]:shadow-white group-data-[twe-input-focused]:border-white",
  notchMiddle:
    "pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow-0 shrink-0 basis-auto w-auto max-w-[calc(100%-1rem)] h-full border-e-0 border-s-0 group-data-[twe-input-focused]:border-x-0 group-data-[twe-input-state-active]:border-x-0 group-data-[twe-input-focused]:border-t group-data-[twe-input-state-active]:border-t group-data-[twe-input-focused]:border-solid group-data-[twe-input-state-active]:border-solid group-data-[twe-input-focused]:border-t-transparent group-data-[twe-input-state-active]:border-t-transparent",
  notchMiddleNormal:
    "border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:shadow-notch-2 group-data-[twe-input-focused]:border-primary",
  notchMiddleWhite:
    "border-neutral-200 group-data-[twe-input-focused]:shadow-notch-2 group-data-[twe-input-focused]:shadow-white group-data-[twe-input-focused]:border-white",
  notchTrailing:
    "pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow h-full border-s-0 rounded-e-[0.25rem] group-data-[twe-input-focused]:border-s-0 group-data-[twe-input-state-active]:border-s-0",
  notchTrailingNormal:
    "border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:shadow-notch-3 group-data-[twe-input-focused]:border-primary",
  notchTrailingWhite:
    "border-neutral-200 group-data-[twe-input-focused]:shadow-notch-3 group-data-[twe-input-focused]:shadow-white group-data-[twe-input-focused]:border-white",
  counter: "text-right leading-[1.6]",
};

const DefaultClassesType = {
  notch: "string",
  notchLeading: "string",
  notchLeadingNormal: "string",
  notchLeadingWhite: "string",
  notchMiddle: "string",
  notchMiddleNormal: "string",
  notchMiddleWhite: "string",
  notchTrailing: "string",
  notchTrailingNormal: "string",
  notchTrailingWhite: "string",
  counter: "string",
};

/*
------------------------------------------------------------------------
Class Definition
------------------------------------------------------------------------
*/

class Input {
  constructor(element, config, classes) {
    this._config = this._getConfig(config, element);
    this._element = element;
    this._classes = this._getClasses(classes);
    this._label = null;
    this._labelWidth = 0;
    this._labelMarginLeft = 0;
    this._notchLeading = null;
    this._notchMiddle = null;
    this._notchTrailing = null;
    this._initiated = false;
    this._helper = null;
    this._counter = false;
    this._counterElement = null;
    this._maxLength = 0;
    this._leadingIcon = null;
    if (this._element) {
      Data.setData(element, DATA_KEY, this);
      this.init();
    }
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  get input() {
    const inputElement =
      SelectorEngine.findOne("input", this._element) ||
      SelectorEngine.findOne("textarea", this._element);
    return inputElement;
  }

  // Public
  init() {
    if (this._initiated) {
      return;
    }
    this._getLabelData();
    this._applyDivs();
    this._applyNotch();
    this._activate();
    this._getHelper();
    this._getCounter();
    this._getEvents();
    this._initiated = true;
  }

  update() {
    this._getLabelData();
    this._getNotchData();
    this._applyNotch();
    this._activate();
    this._getHelper();
    this._getCounter();
  }

  forceActive() {
    this.input.setAttribute(DATA_ACTIVE, "");

    SelectorEngine.findOne(SELECTOR_NOTCH, this.input.parentNode).setAttribute(
      DATA_ACTIVE,
      ""
    );
  }

  forceInactive() {
    this.input.removeAttribute(DATA_ACTIVE);

    SelectorEngine.findOne(
      SELECTOR_NOTCH,
      this.input.parentNode
    ).removeAttribute(DATA_ACTIVE);
  }

  dispose() {
    this._removeBorder();

    Data.removeData(this._element, DATA_KEY);
    this._element = null;
  }

  // Private

  _getConfig(config, element) {
    config = {
      ...Default,
      ...Manipulator.getDataAttributes(element),
      ...(typeof config === "object" ? config : {}),
    };
    typeCheckConfig(NAME, config, DefaultType);
    return config;
  }

  _getClasses(classes) {
    const dataAttributes = Manipulator.getDataClassAttributes(this._element);

    classes = {
      ...DefaultClasses,
      ...dataAttributes,
      ...classes,
    };

    typeCheckConfig(NAME, classes, DefaultClassesType);

    return classes;
  }

  _getLabelData() {
    this._label = SelectorEngine.findOne("label", this._element);

    if (this._label === null) {
      this._showPlaceholder();
    } else {
      this._getLabelWidth();
      this._getLabelPositionInInputGroup();
      this._toggleDefaultDatePlaceholder();
    }
  }

  _getHelper() {
    this._helper = SelectorEngine.findOne(SELECTOR_HELPER, this._element);
  }

  _getCounter() {
    this._counter = Manipulator.getDataAttribute(
      this.input,
      "inputShowcounter"
    );
    if (this._counter) {
      this._maxLength = this.input.maxLength;
      this._showCounter();
    }
  }

  _getEvents() {
    EventHandler.on(
      this._element,
      "focus",
      "input",
      Input.activate(new Input())
    );
    EventHandler.on(
      this._element,
      "input",
      "input",
      Input.activate(new Input())
    );
    EventHandler.on(
      this._element,
      "blur",
      "input",
      Input.deactivate(new Input())
    );

    EventHandler.on(
      this._element,
      "focus",
      "textarea",
      Input.activate(new Input())
    );
    EventHandler.on(
      this._element,
      "input",
      "textarea",
      Input.activate(new Input())
    );
    EventHandler.on(
      this._element,
      "blur",
      "textarea",
      Input.deactivate(new Input())
    );

    EventHandler.on(window, "shown.twe.modal", (e) => {
      SelectorEngine.find(SELECTOR_OUTLINE_INPUT, e.target).forEach(
        (element) => {
          const instance = Input.getInstance(element.parentNode);
          if (!instance) {
            return;
          }
          instance.update();
        }
      );
      SelectorEngine.find(SELECTOR_OUTLINE_TEXTAREA, e.target).forEach(
        (element) => {
          const instance = Input.getInstance(element.parentNode);
          if (!instance) {
            return;
          }
          instance.update();
        }
      );
    });

    EventHandler.on(window, "shown.twe.dropdown", (e) => {
      const target = e.target.parentNode.querySelector(
        "[data-twe-dropdown-menu-ref]"
      );
      if (target) {
        SelectorEngine.find(SELECTOR_OUTLINE_INPUT, target).forEach(
          (element) => {
            const instance = Input.getInstance(element.parentNode);
            if (!instance) {
              return;
            }
            instance.update();
          }
        );
        SelectorEngine.find(SELECTOR_OUTLINE_TEXTAREA, target).forEach(
          (element) => {
            const instance = Input.getInstance(element.parentNode);
            if (!instance) {
              return;
            }
            instance.update();
          }
        );
      }
    });

    EventHandler.on(window, "shown.twe.tab", (e) => {
      let targetId;

      if (e.target.href) {
        targetId = e.target.href.split("#")[1];
      } else {
        targetId = Manipulator.getDataAttribute(e.target, "target").split(
          "#"
        )[1];
      }

      const target = SelectorEngine.findOne(`#${targetId}`);
      SelectorEngine.find(SELECTOR_OUTLINE_INPUT, target).forEach((element) => {
        const instance = Input.getInstance(element.parentNode);
        if (!instance) {
          return;
        }
        instance.update();
      });
      SelectorEngine.find(SELECTOR_OUTLINE_TEXTAREA, target).forEach(
        (element) => {
          const instance = Input.getInstance(element.parentNode);
          if (!instance) {
            return;
          }
          instance.update();
        }
      );
    });

    // form reset handler
    EventHandler.on(window, "reset", (e) => {
      SelectorEngine.find(SELECTOR_OUTLINE_INPUT, e.target).forEach(
        (element) => {
          const instance = Input.getInstance(element.parentNode);
          if (!instance) {
            return;
          }
          instance.forceInactive();
        }
      );
      SelectorEngine.find(SELECTOR_OUTLINE_TEXTAREA, e.target).forEach(
        (element) => {
          const instance = Input.getInstance(element.parentNode);
          if (!instance) {
            return;
          }
          instance.forceInactive();
        }
      );
    });

    // auto-fill
    EventHandler.on(window, "onautocomplete", (e) => {
      const instance = Input.getInstance(e.target.parentNode);
      if (!instance || !e.cancelable) {
        return;
      }
      instance.forceActive();
    });
  }

  _showCounter() {
    const counters = SelectorEngine.find(
      `[${DATA_FORM_COUNTER}]`,
      this._element
    );
    if (counters.length > 0) {
      return;
    }
    this._counterElement = document.createElement("div");
    Manipulator.addClass(this._counterElement, this._classes.counter);
    this._counterElement.setAttribute(DATA_FORM_COUNTER, "");
    const actualLength = this.input.value.length;
    this._counterElement.innerHTML = `${actualLength} / ${this._maxLength}`;
    this._helper.appendChild(this._counterElement);
    this._bindCounter();
  }

  _bindCounter() {
    EventHandler.on(this.input, "input", () => {
      const actualLength = this.input.value.length;
      this._counterElement.innerHTML = `${actualLength} / ${this._maxLength}`;
    });
  }

  _toggleDefaultDatePlaceholder(input = this.input) {
    const isTypeDate = input.getAttribute("type") === "date";
    if (!isTypeDate) {
      return;
    }
    const isInputFocused = document.activeElement === input;

    if (!isInputFocused && !input.value) {
      input.style.opacity = 0;
    } else {
      input.style.opacity = 1;
    }
  }

  _showPlaceholder() {
    this.input.setAttribute(DATA_PLACEHOLDER_ACTIVE, "");
  }

  _getNotchData() {
    this._notchMiddle = SelectorEngine.findOne(
      SELECTOR_NOTCH_MIDDLE,
      this._element
    );
    this._notchLeading = SelectorEngine.findOne(
      SELECTOR_NOTCH_LEADING,
      this._element
    );
  }

  _getLabelWidth() {
    this._labelWidth = this._label.clientWidth * 0.8 + 8;
  }

  _getLabelPositionInInputGroup() {
    this._labelMarginLeft = 0;
    if (!this._element.hasAttribute("data-twe-input-group-ref")) return;
    const input = this.input;
    const prefix = SelectorEngine.prev(
      input,
      "[data-twe-input-group-text-ref]"
    )[0];
    if (prefix === undefined) {
      this._labelMarginLeft = 0;
    } else {
      this._labelMarginLeft = prefix.offsetWidth - 1;
    }
  }

  _applyDivs() {
    const shadowLeading = this._config.inputFormWhite
      ? this._classes.notchLeadingWhite
      : this._classes.notchLeadingNormal;
    const shadowMiddle = this._config.inputFormWhite
      ? this._classes.notchMiddleWhite
      : this._classes.notchMiddleNormal;
    const shadowTrailing = this._config.inputFormWhite
      ? this._classes.notchTrailingWhite
      : this._classes.notchTrailingNormal;

    const allNotchWrappers = SelectorEngine.find(SELECTOR_NOTCH, this._element);
    const notchWrapper = element("div");
    Manipulator.addClass(notchWrapper, this._classes.notch);
    notchWrapper.setAttribute(DATA_NOTCH, "");
    this._notchLeading = element("div");

    Manipulator.addClass(
      this._notchLeading,
      `${this._classes.notchLeading} ${shadowLeading}`
    );
    this._notchLeading.setAttribute(DATA_NOTCH_LEADING, "");
    this._notchMiddle = element("div");

    Manipulator.addClass(
      this._notchMiddle,
      `${this._classes.notchMiddle} ${shadowMiddle}`
    );
    this._notchMiddle.setAttribute(DATA_NOTCH_MIDDLE, "");
    this._notchTrailing = element("div");

    Manipulator.addClass(
      this._notchTrailing,
      `${this._classes.notchTrailing} ${shadowTrailing}`
    );
    this._notchTrailing.setAttribute(DATA_NOTCH_TRAILING, "");
    if (allNotchWrappers.length >= 1) {
      return;
    }
    notchWrapper.append(this._notchLeading);
    notchWrapper.append(this._notchMiddle);
    notchWrapper.append(this._notchTrailing);
    this._element.append(notchWrapper);

    // for now, before we can fix the rtl for notches
    notchWrapper.dir = "ltr";
  }

  _applyNotch() {
    this._notchMiddle.style.width = `${this._labelWidth}px`;
    this._notchLeading.style.width = `${this._labelMarginLeft + 9}px`;

    if (this._label === null) return;
    this._label.style.marginLeft = `${this._labelMarginLeft}px`;
  }

  _removeBorder() {
    const border = SelectorEngine.findOne(SELECTOR_NOTCH, this._element);
    if (border) border.remove();
  }

  _activate(event) {
    onDOMContentLoaded(() => {
      this._getElements(event);
      const input = event ? event.target : this.input;
      const notchWrapper = SelectorEngine.findOne(
        SELECTOR_NOTCH,
        this._element
      );
      if (event && event.type === "focus") {
        notchWrapper && notchWrapper.setAttribute(DATA_FOCUSED, "");
      }

      if (input.value !== "") {
        input.setAttribute(DATA_ACTIVE, "");
        notchWrapper && notchWrapper.setAttribute(DATA_ACTIVE, "");
      }
      this._toggleDefaultDatePlaceholder(input);
    });
  }

  _getElements(event) {
    if (event) {
      this._element = event.target.parentNode;
      this._label = SelectorEngine.findOne("label", this._element);
    }

    if (event && this._label) {
      const prevLabelWidth = this._labelWidth;
      this._getLabelData();

      if (prevLabelWidth !== this._labelWidth) {
        this._notchMiddle = SelectorEngine.findOne(
          SELECTOR_NOTCH_MIDDLE,
          event.target.parentNode
        );
        this._notchLeading = SelectorEngine.findOne(
          SELECTOR_NOTCH_LEADING,
          event.target.parentNode
        );
        this._applyNotch();
      }
    }
  }

  _deactivate(event) {
    const input = event ? event.target : this.input;

    if (input.getAttribute("aria-expanded") === "true") {
      return;
    }

    const notchWrapper = SelectorEngine.findOne(
      SELECTOR_NOTCH,
      input.parentNode
    );
    notchWrapper.removeAttribute(DATA_FOCUSED);

    if (input.value === "") {
      input.removeAttribute(DATA_ACTIVE);
      notchWrapper.removeAttribute(DATA_ACTIVE);
    }
    this._toggleDefaultDatePlaceholder(input);
  }

  static activate(instance) {
    return function (event) {
      instance._activate(event);
    };
  }

  static deactivate(instance) {
    return function (event) {
      instance._deactivate(event);
    };
  }

  static jQueryInterface(config, options) {
    return this.each(function () {
      let data = Data.getData(this, DATA_KEY);
      const _config = typeof config === "object" && config;
      if (!data && /dispose/.test(config)) {
        return;
      }
      if (!data) {
        data = new Input(this, _config);
      }
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](options);
      }
    });
  }

  static getInstance(element) {
    return Data.getData(element, DATA_KEY);
  }

  static getOrCreateInstance(element, config = {}) {
    return (
      this.getInstance(element) ||
      new this(element, typeof config === "object" ? config : null)
    );
  }
}

export default Input;
