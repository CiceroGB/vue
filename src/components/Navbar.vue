<template>
  <nav>
    <v-navigation-drawer dark app expand-on-hover mini-variant class="indigo darken-2">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://conteudo.imguol.com.br/c/noticias/9e/2018/11/12/dinheiro-moeda-juros-divida-cartao-de-credito-investimentos-bolsa-de-valores-financas-pessoais-precos-inflacao-riqueza-patrimonio-1542057700956_v2_450x450.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title class="title"> IPCA </v-list-item-title>
            <v-list-item-subtitle
              >Índice Nacional de Preços <br/>ao Consumidor
              Amplo</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item route to = "/">
          <v-list-item-icon>
            <v-icon>fas fa-window-restore</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>fas fa-table</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Tabelas</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>fas fa-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Gráficos</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>