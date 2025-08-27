<template>
  <div>
    <Nav />
    <main class="pt-16">
      <Suspense>
        <NuxtPage />
        <template #fallback>
          <div class="p-10 text-center">Loading page...</div>
        </template>
      </Suspense>
    </main>
    <Footer />
  </div>
</template>
