import streamlit as st
import sympy as sp
import random

# ---------------- CONFIG ----------------
st.set_page_config(page_title="EduMind IA", page_icon="🎓")

x = sp.symbols("x")

# ---------------- ESTADO ----------------
if "usuario" not in st.session_state:
    st.session_state.usuario = ""

if "puntos" not in st.session_state:
    st.session_state.puntos = 0

if "plan" not in st.session_state:
    st.session_state.plan = "FREE"

if "uso" not in st.session_state:
    st.session_state.uso = 0

# ---------------- LOGIN ----------------
st.title("🤖 EduMind - Tutor Inteligente")

usuario = st.text_input("👤 Escribe tu nombre")

if st.button("Entrar"):
    st.session_state.usuario = usuario
    st.success(f"Bienvenido {usuario} 👋")

# ---------------- APP PRINCIPAL ----------------
if st.session_state.usuario != "":

    # ---------------- SIDEBAR ----------------
    st.sidebar.title("💰 Plan")

    st.session_state.plan = st.sidebar.selectbox(
        "Elige plan",
        ["FREE", "PRO"]
    )

    if st.sidebar.button("💎 Activar PRO"):
        st.session_state.plan = "PRO"
        st.sidebar.success("Ahora eres PRO 🎉")

    st.sidebar.write("Usuario:", st.session_state.usuario)
    st.sidebar.write("Plan:", st.session_state.plan)
    st.sidebar.write("Puntos:", st.session_state.puntos)

    st.divider()

    # ---------------- MODO ----------------
    modo = st.selectbox("📚 Modo", ["Matemáticas", "Ejercicios"])

    # ---------------- MATES ----------------
    if modo == "Matemáticas":

        ecuacion = st.text_input("Ejemplo: 2*x + 10 = 20", "2*x + 10 = 20")

        if st.button("Resolver"):

            try:
                izq, der = ecuacion.split("=")

                lhs = sp.sympify(izq)
                rhs = sp.sympify(der)

                st.latex(f"{sp.latex(lhs)} = {sp.latex(rhs)}")

                sol = sp.solve(sp.Eq(lhs, rhs), x)

                st.success(f"x = {sol[0]}")

                st.session_state.puntos += 10
                st.info("+10 puntos")

            except:
                st.error("Error en la ecuación")

    # ---------------- EJERCICIOS ----------------
    else:

        a = random.randint(1, 10)
        b = random.randint(1, 20)
        sol = random.randint(1, 10)
        c = a * sol + b

        st.info(f"Resuelve: {a}x + {b} = {c}")

        respuesta = st.number_input("Tu respuesta:", step=1)

        if st.button("Comprobar"):

            if respuesta == sol:
                st.success("🎉 Correcto +10 puntos")
                st.session_state.puntos += 10
            else:
                st.error(f"❌ Incorrecto, era {sol}")

else:
    st.info("⚠️ Escribe tu nombre para comenzar")
