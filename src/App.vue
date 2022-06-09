<template>
  <v-app>
    <v-container>
      <v-row class="justify-center">
        <v-card width="50%">
          <v-card-title>Axios+Firebase</v-card-title>
          <v-card-text>
            <v-text-field v-model="cliente.name" label="Name" required></v-text-field>
            <v-text-field v-model="cliente.email" label="Email" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="salvar()">Salvar</v-btn>
          </v-card-actions>
          <v-card>
            <v-list>
              <v-list-item v-for="(cliente, id) in clientes" :key="id">
                <v-list-item-content>
                <v-list-item-title>{{ cliente.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ cliente.email }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="remover(id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn icon @click="editar(cliente, id)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      clientes:[],
      ID:'',
    cliente: {
      name: '',
      email: ''
      }
    }
  },

  methods:{
    salvar(){
      if(this.cliente.name == '' || this.cliente.email == ''){
        alert('Preencha todos os campos')
      }else{
        if(!this.ID){
          this.$http.post('clientes.json', this.cliente)
          .then(() => {
            this.cliente.name = ''
            this.cliente.email = ''
            this.listar()
          })
          .catch(error => {
            console.log(error)
          })
        }else{
          this.$http.put(`clientes/${this.ID}.json`, this.cliente)
          .then(() => {
            this.cliente.name = ''
            this.cliente.email = ''
            this.ID = ''
            this.listar()
          })
          .catch(error => {
            console.log(error)
          })
        }  
      }
    },
    listar(){
      this.$http.get('clientes.json')
      .then(response => {
        this.clientes = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    remover(id){
      this.$http.delete(`clientes/${id}.json`)
      .then(() => {
        this.listar()
      })
      .catch(error => {
        console.log(error)
      })
    },
    editar(cliente, id){
      this.cliente = {...cliente}
      this.ID = id
    }
  },

  created(){
    this.listar()
  }
}
</script>

<style>

</style>