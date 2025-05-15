document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const clave = document.getElementById('clave').value;
    if (clave === 'admin123') {
        window.location.href = 'admin.html'; // tu vista actual CRUD
    } else {
        document.getElementById('mensaje').textContent = 'Clave incorrecta';
    }
});
