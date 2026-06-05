# 1. Primero definimos las configuraciones
CONFIG_LIGAS = {
    "Premier": {"tiros_min": 4, "pos_min": 40},
    "LaLiga": {"tiros_min": 4, "pos_min": 35},
    "SerieA": {"tiros_min": 3, "pos_min": 30},
    "Mundial": {"tiros_min": 5, "pos_min": 45}
}

# 2. Luego definimos la función que usa esas configuraciones
def determinar_mercado(datos):
    liga = datos.get('liga', 'LaLiga')
    # Aquí es donde el error desaparece porque ya conoce CONFIG_LIGAS
    stats = CONFIG_LIGAS.get(liga, CONFIG_LIGAS["LaLiga"])
    
    pos = datos['pos']
    tiros = datos['tiros']

    # Lógica de alta precisión
    if pos >= 55 and tiros >= 8:
        return "CÓRNERS", f"Recomendado: CÓRNERS (Alta Probabilidad) en {liga}"
    elif pos >= 60 and tiros < 5:
        return "POSESIÓN", f"Recomendado: Ganador de Posesión en {liga}"
    elif pos < 50 and tiros >= 7:
        return "GOLES", f"Recomendado: Más de 2.5 Goles en {liga}"
    else:
        return "PRECAUCIÓN", f"Partido sin tendencia clara en {liga}"