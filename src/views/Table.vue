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
            :items="selectedDate"
            @change="changeDate"
            label="Selecione o período"
          ></v-select>
        </v-col>
        <v-col class="d-flex justify-end" cols="12" sm="8">
          <download-csv :data="ipca">
            <v-btn color="success" class="mr-6">
              dados CSV
              <i class="mdi mdi-export-variant" aria-hidden="true"></i>
            </v-btn>
          </download-csv>
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
        item-key="subId"
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
            <v-data-table
              class="blue-grey lighten-5"
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
        lastDate: "",
      },
      selectedDate: [],
    };
  },
  methods: {
    changeDate(selectObj) {
      this.ipca = this.ipcaAll.filter((item) => item.D4N === "Índice geral");
      if (selectObj !== "todos") {
        this.ipca = this.ipca.filter((item) => item.D3N === selectObj);
      }
    },

    loadDetails({ item }) {
      let ary = [];
      ary = this.ipcaAll.filter((itemMap) => itemMap.D2N === item.D2N);
      ary = ary.filter((item) => item.D4N !== "Índice geral");
      this.ipcaChildrens = ary.filter((itemMap) => itemMap.D3N === item.D3N);
    },
  },

  async mounted() {
    await api.get("").then((res) => {
      this.ipcaAll = res.data;
      this.ipcaAll = this.ipcaAll.filter((item) => item.D3C !== "Mês (Código)");
      let i = 0;
      this.ipcaAll = this.ipcaAll.map((obj) => ({ ...obj, subId: i++ }));
      this.ipca = this.ipcaAll.filter((item) => item.D4N === "Índice geral");
    });

    const lastDate = this.ipcaAll.reduce((prev, current) =>
      prev.D3C > current.D3C ? prev.D3N : current.D3N
    );

    this.input.lastDate = lastDate;

    this.selectedDate = this.ipcaAll.reduce((prev, current) => {
      const x = prev.find((item) => item.D3C === current.D3C);
      if (!x) {
        return prev.concat([current]);
      } else {
        return prev;
      }
    }, []);
    this.selectedDate.sort((a, b) => parseFloat(b.D3C) - parseFloat(a.D3C));

    this.selectedDate = this.selectedDate.map((item) => item.D3N);

    this.selectedDate.unshift("todos");

    this.ipca = this.ipca.filter((item) => item.D3N === this.input.lastDate);
  },
};
</script>