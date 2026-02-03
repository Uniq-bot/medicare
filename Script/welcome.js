// Toggle sidebar on index page
let sidebarVisible = false;

document.addEventListener('DOMContentLoaded', function() {
    const medicareToggle = document.getElementById('medicareToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.welcome-main');
    const pbutton=document.querySelector('.primary');
    const sbutton=document.querySelector('.secondary');

    const user=localStorage.getItem('user');
    if(!user){
        // pbutton.style.display='none';
        sbutton.style.display='none';
    }
    else if(user){
        pbutton.style.display='none';
    }
    if (medicareToggle && sidebar && mainContent) {
        medicareToggle.addEventListener('click', function() {
            sidebarVisible = !sidebarVisible;
            
            if (sidebarVisible) {
                sidebar.classList.remove('sidebar-hidden');
                sidebar.classList.add('sidebar-visible');
                mainContent.classList.add('sidebar-visible');
            } else {
                sidebar.classList.add('sidebar-hidden');
                sidebar.classList.remove('sidebar-visible');
                mainContent.classList.remove('sidebar-visible');
            }
        });
    }
    
    // Initialize lucide icons
    lucide.createIcons();
});
