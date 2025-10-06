# TODO List para Implementación de Mascotas y Chatbot

## Backend
- [x] Agregar campo Avatar al modelo Mascota
- [x] Actualizar DTOs MascotaDto y CrearMascotaDto para incluir Avatar
- [x] Crear y ejecutar migración para agregar columna Avatar a la tabla Mascotas
- [x] Crear ChatbotController con integración a OpenAI

## Frontend
- [x] Agregar botón "Mascotas" al Navbar para clientes
- [x] Crear página MascotasPage.js con lista de mascotas y formulario de registro
- [x] Implementar dropdown para Especie (Gato/Perro) y selección de avatares animados
- [x] Agregar ruta para /mascotas en App.js
- [x] Instalar react-chatbot-kit y dependencias para OpenAI
- [x] Crear componente Chatbot.js con integración a OpenAI para recomendaciones personalizadas
- [x] Agregar chatbot flotante a la app principal
- [x] Configurar variables de entorno para API key de OpenAI

## Testing
- [x] Probar registro de mascotas con selección de avatar
- [x] Probar chatbot con recomendaciones basadas en mascotas
- [x] Verificar estilo consistente con el resto de la app
