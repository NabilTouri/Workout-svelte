const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  
	plugins: [require('flowbite/plugin')],
  
	darkMode: 'class',
  
	theme: {
		extend: {
			colors: {
		  	// flowbite-svelte
			  primary: {
				50: "#ffc99d",
				100: "#ffa472",
				200: "#ff9c59",
				300: "#ff7e26",
				400: "#ff580f",
				500: "#d16a05", // Aggiunto un altro colore per completare la palette
				600: "#a85004", // Aggiunto un altro colore per completare la palette
				700: "#7e3603", // Aggiunto un altro colore per completare la palette
				800: "#541c02", // Aggiunto un altro colore per completare la palette
				900: "#2a0101", // Aggiunto un altro colore per completare la palette
			},
			dark: {
				400: "#808080", // Grigio scuro
				500: "#666666", // Grigio scuro
				600: "#4d4d4d", // Grigio molto scuro
				700: "#333333", // Grigio molto scuro
				800: "#1a1a1a", // Grigio molto scuro
				900: "#090909", // Nero
				accent1: "#ff6666", // Rosso
				accent2: "#66ff66", // Verde
				accent3: "#6666ff", // Blu
			}
			
			}
	  	}
	}
};
  
module.exports = config;