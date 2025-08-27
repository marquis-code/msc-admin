<template>
  <main
    class="min-h-screen bg-white dark:bg-dark transition-colors duration-300"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiToast />
  </main>
</template>

<style>
/* Global dark mode styles */
html.dark {
  color-scheme: dark;
}

/* Smooth transitions for theme changes */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar for dark mode */
html.dark ::-webkit-scrollbar {
  width: 8px;
}

html.dark ::-webkit-scrollbar-track {
  background: #2a3441;
}

html.dark ::-webkit-scrollbar-thumb {
  background: linear-gradient(#2a3441, #00b8ae);
  border-radius: 4px;
}

html.dark ::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>
