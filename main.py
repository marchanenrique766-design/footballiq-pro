import os
import logging
from dotenv import load_dotenv
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackQueryHandler
from analyzar import determinar_mercado

# Cargar token
load_dotenv()
TOKEN = os.getenv("TOKEN")

# Configurar logs para ver errores si ocurren
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

async def button_click(update, context):
    query = update.callback_query
    await query.answer()
    if query.data == 'fav':
        await query.edit_message_text(text="✅ *Análisis guardado en favoritos.*", parse_mode='Markdown')

async def comando_analizar(update, context):
    try:
        # Recibir: Liga, Equipo, Posesión, Tiros
        texto = " ".join(context.args)
        partes = [p.strip() for p in texto.split(",")]
        
        datos = {
            'liga': partes[0],
            'equipo': partes[1],
            'pos': int(partes[2]),
            'tiros': int(partes[3])
        }
        
        tipo, mercado = determinar_mercado(datos)
        
        keyboard = [[InlineKeyboardButton("💾 Guardar", callback_data='fav')]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        mensaje = f"📊 *ANÁLISIS {datos['liga'].upper()}*\n*Equipo:* {datos['equipo']}\n*Recomendación:* `{mercado}`"
        await update.message.reply_text(mensaje, parse_mode='Markdown', reply_markup=reply_markup)
        
    except Exception as e:
        await update.message.reply_text("⚠️ *Error:* Usa el formato: /analizar Liga, Equipo, Posesion, Tiros")

if __name__ == "__main__":
    app = ApplicationBuilder().token(TOKEN).build()
    
    app.add_handler(CommandHandler("analizar", comando_analizar))
    app.add_handler(CallbackQueryHandler(button_click))
    
    print("--- BOT ACTIVO Y LISTO ---")
    app.run_polling()