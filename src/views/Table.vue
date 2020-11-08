<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-container fluid>
      <section class="mb-12 text-center">
        <h1 class="font-weight-light mb-2 headline">{{ $route.name }}</h1>
      </section>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="input.lastDate"
            :items="choices"
            @change="changeDate"
            label="Selecione o mês"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="ipca"
        :search="search"
        :expanded.sync="expanded"
        item-key="D3N"
        show-expand
        @item-expanded="loadDetails"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.V`]="{ item }">
          <span>{{
            parseFloat(item.V).toFixed(2).replace("NaN", "-").replace(".", ",")
          }}</span>
        </template>
        <template v-slot:top> </template>
        <template v-slot:expanded-item="{}">
          <td :colspan="5">
            <v-data-table class= "blue-grey lighten-5"
              :headers="headers"  
              :items="ipcaChildrens"
              :hide-default-footer="true"
            >
              <template v-slot:[`item.V`]="{ item }">
                <span>{{
                  parseFloat(item.V)
                    .toFixed(2)
                    .replace("NaN", "-")
                    .replace(".", ",")
                }}</span>
              </template>
            </v-data-table>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import api from "../service/api";
export default {
  data() {
    return {
      ipcaAll: [],
      ipca: [],
      ipcaChildrens: [],
      search: "",
      expanded: [],
      singleExpand: false,
      headers: [
        { text: "Variável", value: "D2N" },
        { text: "Grupo", value: "D4N" },
        { text: "Período", value: "D3N" },
        { text: "Variação %", value: "V" },
      ],
      input: {
        lastMonth: "dezembro",
      },
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
    changeDate(selectObj) {
      console.log(selectObj);
    },
    loadDetails({ item }) {
      console.log(item.D2N);
      let ary = [];
      ary = this.ipcaAll.filter((itemMap) => itemMap.D2N === item.D2N);
      ary = ary.filter((item) => item.D4N !== "Índice geral");
      this.ipcaChildrens = ary.filter((itemMap) => itemMap.D3N === item.D3N);
    },
  },

  mounted() {
    api.get("").then((res) => {
      this.ipcaAll = res.data;
      this.ipcaAll.map((item) => console.log(item.NC));
      this.ipca = this.ipcaAll.filter((item) => item.D4N === "Índice geral");
    });
  },
};
</script>