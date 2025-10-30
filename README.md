🔐 Sistema de Autenticación MFA – Spring Boot + React

Este proyecto implementa un sistema de autenticación multifactor (MFA) utilizando Spring Boot (para el backend) y React + Vite (para el frontend).
El objetivo es fortalecer la seguridad del inicio de sesión mediante la verificación con códigos OTP (One-Time Password) enviados por correo electrónico, además del uso de credenciales tradicionales (usuario y contraseña).

🧠 Descripción del proyecto

El sistema permite que un usuario se registre, inicie sesión y valide su identidad mediante un código OTP temporal enviado a su correo electrónico.
Este flujo proporciona una capa adicional de seguridad frente a intentos de acceso no autorizados.

El backend se encarga de la autenticación principal, el manejo de tokens JWT, el envío del OTP al correo y la validación de su vigencia.
El frontend ofrece una interfaz moderna e intuitiva desarrollada con React, que guía al usuario paso a paso durante el proceso de verificación.


🧱 Tecnologías utilizadas
⚙️ Backend

Java 17

Spring Boot 3

Spring Security + JWT

PostgreSQL + JPA/Hibernate

JavaMailSender (para el envío de códigos OTP)

Maven

💻 Frontend

React 18 (con Vite)

React 

CSS 

🚀 Instrucciones para ejecutar el sistema
1️⃣ Clonar el repositorio
git clone https://github.com/WilliamSosa895/MFA_Login_System.git
cd MFA

2️⃣ Configurar y ejecutar el backend

Ubicado en la carpeta /backend

cd backend

📦 Requisitos

Java 17 o superior

PostgreSQL en ejecución

Maven

⚙️ Configurar application.properties

Edita el archivo src/main/resources/application.properties con tus datos:

server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/mfa_db
spring.datasource.username=postgres
spring.datasource.password=tu_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=tu_correo@gmail.com
spring.mail.password=tu_contraseña_de_aplicacion
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true


⚠️ Asegúrate de usar una “contraseña de aplicación” si usas Gmail.

▶️ Ejecutar el backend
./mvnw spring-boot:run


o si tienes Maven instalado globalmente:

mvn spring-boot:run


El backend estará disponible en
👉 http://localhost:8080

3️⃣ Configurar y ejecutar el frontend

Ubicado en la carpeta /frontend

cd ../frontend

📦 Requisitos

Node.js v18

npm v10+

⚙️ Instalar dependencias
npm install

⚙️ Configurar .env.local

Crea el archivo .env.local en la raíz del frontend con el contenido:

VITE_API_URL=http://localhost:8080

▶️ Ejecutar en modo desarrollo
npm run dev


El frontend estará disponible en
👉 http://localhost:5173

🔑 Ejemplo de flujo de Login + OTP
🧍‍♂️ Paso 1. Registro de usuario

El usuario accede a la página /register y completa el formulario con:

Nombre

Apellidos

Correo electrónico

Contraseña

Confirmación de contraseña

El backend valida los datos, cifra la contraseña y guarda al usuario en la base de datos.

🔐 Paso 2. Inicio de sesión

El usuario ingresa su correo y contraseña en la página /login.

El backend valida las credenciales:

Si son correctas, genera un código OTP (6 dígitos).

Guarda el OTP en la base de datos.

Envía el OTP al correo electrónico del usuario.

El frontend muestra un mensaje indicando que el código fue enviado.

✉️ Paso 3. Verificación del código OTP

El usuario abre su correo y copia el código recibido.

En la pantalla /verify-otp, introduce el código OTP.

El backend valida que:

El código sea correcto.

No haya expirado.

No haya sido utilizado antes.

Si la verificación es exitosa, se genera un token JWT que se devuelve al frontend.

🧭 Paso 4. Acceso al Dashboard

El frontend guarda el token JWT en localStorage.
Con este token, el usuario puede acceder al Dashboard en /dashboard,
donde se muestra un mensaje de inicio de sesión exitoso.
También puede cerrar sesión, eliminando el token almacenado.

📚 Resumen del flujo técnico
[Login] --> [AuthController.login()] --> Genera OTP --> Envía correo
     ↓
[Verify OTP] --> [AuthController.verifyOtp()] --> Valida código --> Genera JWT
     ↓
[Frontend] --> Guarda token JWT --> Acceso a /dashboard protegido

📦 Estructura del repositorio
MFA-LoginSystem/
├── backend/                  # API Spring Boot (autenticación y OTP)
│   ├── src/main/java/com/security/autenticationMfa/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Repository/
│   │   ├── Services/
│   │   └── Security/
│   └── pom.xml
│
├── frontend/                 # Aplicación React (interfaz de usuario)
│   ├── src/
│   │   ├── components/
│   │   ├── containers/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
└── README.md

🧑‍💻 Autor

William Sosa
Proyecto académico – Universidad Veracruzana
Ingeniería de Software
“Autenticación multifactor (MFA) con Spring Boot y React”
