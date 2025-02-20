<template>
  <div>
    <header>
      <h1>lbandeira</h1>
      <p>
        Engenheira de sistemas embarcados, maker e apaixonada por inovação. Sou formada em Eng. Computação no Cin-UFPE e mestranda na mesma instituição. Sou uma curiosa que adora inventar “coisas” para auxiliar no dia a dia da humanidade.
      </p>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>&copy; 2023 Ibandeira. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style>
/* body {
  font-family: 'Inria Sans', sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  color: #333;
} */

header {
  padding: 20px;
  text-align: center;
}

header h1 {
  margin: 0;
  font-size: 50px;
}

header p {
  font-family: 'Inder', sans-serif;
  margin: 10px 0 0;
}

main {
  margin: 20px;
}

footer {
  text-align: center;
  padding: 10px;
  color: #333;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>