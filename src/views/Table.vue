<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-container fluid>
      <section class="mb-12 text-center">
        <h1 class="font-weight-light mb-2 headline">{{ $route.name }}</h1>
      </section>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            :items="choices"
            @change="changeMonth"
            label="Selecione o mês"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="ipca"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.V="{ item }">
        <span>{{
          parseFloat(item.V).toFixed(2).replace("NaN", "-").replace(".", ",")
        }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import api from "../service/api";
export default {
  data() {
    return {
      ipca: [],
      headers: [
        { text: "Variável", value: "D2N" },
        { text: "Grupo", value: "D4N" },
        { text: "Período", value: "D3N" },
        { text: "Variação %", value: "V" },
      ],
      choices: [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ],
    };
  },
  methods: {
    changeMonth(selectObj) {
      console.log(selectObj);
    },
  },

  mounted() {
    api.get("").then((res) => {
      const ary = res.data;
      ary.map((item) => console.log(item.NC));
      this.ipca = ary.filter((item) => item.D4N === "Índice geral");
    });
  },
};
</script>