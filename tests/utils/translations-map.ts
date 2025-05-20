export const englishToSpanishTranslations: { [key: string]: string } = {
  // Step 1
  "Step 1 of 12": "Paso 1 de 12",
  "Before you begin": "Antes de que empieces...",
  "What is your preferred language?": "¿Cuál es tu idioma preferido?",
  "GET STARTED": "COMENZAR",

  // Footer
  "Questions? Contact": "¿Preguntas? Contacte",
  "CONTACT US": "CONTÁCTENOS",
  "REPORT AN ISSUE": "INFORMAR UN PROBLEMA",
  "Share MyFriendBen Via:": "Compartir MyFriendBen vía:",
  "Privacy Policy": "Política de privacidad",

  // Step 2
  "What is your state?": "¿Cual es tu estado?",
  "Don't see your state? Click here": "¿No ves tu estado? Haz clic aquí",
  "State - North Carolina": "Estado - Carolina del Norte",
  "BACK": "ATRÁS",
  "CONTINUE": "CONTINUAR",

  // Step 3
  "What you should know:": "Lo que debería saber:",
  "MyFriendBen is a tool that can help determine benefits you are likely eligible for...": "MyFriendBen es una herramienta que puede ayudarle a determinar los beneficios para los que probablemente sea elegible...",
  "I confirm I am 13 years of age or older.": "Yo confirmo que tengo 13 años de edad o más.",

  // Step 4
  "LET'S GET STARTED!": "¡EMPECEMOS!",
  "Tell us where you live.": "Dinos donde vives.",
  "What is your zip code?": "¿Cuál es su código postal?",
  "If you are not filling out MyFriendBen in North Carolina, please click here for other state options.": "Si no estás completando MyFriendBen en North Carolina, por favor haga clic aquí para otras opciones estatales.",
  "Zip Code": "Código postal",
  "Please select a county:": "Seleccione un condado:",
  "County": "Condado",

  // Step 5
  "Tell us about your household": "Cuéntenos sobre su hogar",
  "Including you, how many people are in your household?": "Contándolo a usted, ¿cuántas personas hay en su hogar?",
  "Household Size": "Número de integrantes del hogar",

  // Common buttons and labels
  "Continue": "Continuar",
  "Get Started": "Comenzar",
  "Birth Month": "Mes de nacimiento",
  "Open": "Abrir",
  "Yes": "Sí",
  "Income Type": "Tipo de ingreso",
  "Frequency": "Frecuencia",
  "Amount": "Cantidad",
  "Child": "Hijo/a",
  "Expense Type": "Tipo de gasto",
  "Rent": "Alquiler",
  "Dollar Amount": "Cantidad en dólares",
  "Food or groceries": "Alimentos o comestibles",
  "save my results": "guardar mis resultados",

  // Months
  "March": "Marzo",
  "February": "Febrero",

  // Income types
  "Wages, salaries, tips": "Sueldos, salarios, propinas",
  "every month": "cada mes",

  // Error messages and warnings
  "I don't have or know if I": "No tengo o no sé si tengo",
  "They don't have or know if": "No tienen o no saben si tienen",
  "Concern about your child's": "Preocupación por su hijo/a",
  "Free or low-cost help with": "Ayuda gratuita o de bajo costo con",
  "Test / Prospective Partner": "Prueba / Socio Potencial"
};

export function translateToSpanish(englishText: string): string {
  return englishToSpanishTranslations[englishText] || englishText;
}

export function translateTextsToSpanish(englishTexts: { [key: string]: string[] }): { [key: string]: string[] } {
  const spanishTexts: { [key: string]: string[] } = {};
  
  for (const [url, texts] of Object.entries(englishTexts)) {
    spanishTexts[url] = texts.map(text => translateToSpanish(text));
  }
  
  return spanishTexts;
}
