function toggleSidebar() {
  const sidebar = document.getElementById("docs-sidebar");
  const sidebarDec = document.getElementsByClassName("sidebar-dec");
  const sidebarToggleHidden = document.getElementById("hs-open:hidden");
  const sidebarToggleBlock = document.getElementById("hs-open:block");
  sidebar.classList.toggle("w-sidebar-compress");
  sidebar.classList.toggle("w-sidebar-expand");
  sidebarToggleHidden.classList.toggle("hidden");
  sidebarToggleBlock.classList.toggle("hidden");

  for (let i = 0; i < sidebarDec.length; i++) {
    sidebarDec[i].classList.toggle("hidden");
  }
}
