<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Football IQ PRO</title>
    <style>
        body { background-color: #0c0d0e; color: #ffffff; font-family: sans-serif; display: flex; justify-content: center; padding: 20px; }
        .container { background: #161719; border: 1px solid #333; padding: 20px; border-radius: 8px; width: 100%; max-width: 400px; }
        input { width: 100%; padding: 12px; margin: 10px 0; box-sizing: border-box; background: #222; border: 1px solid #444; color: white; }
        button { width: 100%; padding: 15px; background: #0070f3; color: white; border: none; cursor: pointer; border-radius: 4px; }
    </style>
</head>
<body>

<div class="container">
    <h2>Football IQ PRO</h2>
    <input type="text" id="local" placeholder="EQUIPO LOCAL">
    <input type="text" id="visitante" placeholder="EQUIPO VISITANTE">
    <button onclick="analizar()">ANALIZAR EQUIPOS</button>
    <div id="resultado" style="margin-top: 20px;"></div>
</div>

<script>
    function analizar() {
        const local = document.getElementById('local').value;
        const visitante = document.getElementById('visitante').value;
        const res = document.getElementById('resultado');
        if(local && visitante) {
            res.innerHTML = `<strong>${local.toUpperCase()} vs ${visitante.toUpperCase()}</strong><br>
                             ADN Táctico: Alta presión<br>
                             BTTS: 75%<br>
                             STAKE: 2 U`;
        }
    }
</script>

</body>
</html>
