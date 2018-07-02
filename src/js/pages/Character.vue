<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>
                    Characters
                     <small>
                         <b-btn v-b-modal.changeCharacter
                                @click="newCharacter()"
                         >New</b-btn>
                     </small>
                </h1>
                <b-table hover :items="characters" :fields='fields'>
                    <template slot="actions" slot-scope="data">
                        <b-btn v-b-modal.viewCharacter
                               @click="getCharacter(data.item.slug)"
                        >
                            View
                        </b-btn>
                        <b-btn v-b-modal.changeCharacter
                               @click="getCharacter(data.item.slug)"
                        >
                            Edit
                        </b-btn>
                        <b-btn @click="deleteCharacter(data.item.slug)"
                        >
                            Delete
                        </b-btn>
                    </template>
                </b-table>
            </div>
        </div>
        
        <b-modal id="changeCharacter" 
                 size="lg"
                 @ok="saveCharacter()"
        >
            <h2>{{ title }} Character</h2>
            <div class="row">
                <div class="col-md-6">
                    <label>First Name</label>
                    <b-form-input :state="null" 
                                  type="text" 
                                  v-model="character.first_name"
                    ></b-form-input>
                </div>
                <div class="col-md-6">
                    <label>Last Name</label>
                    <b-form-input :state="null" 
                                  type="text" 
                                  v-model="character.last_name"
                    ></b-form-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label>Race</label>
                    <b-form-input :state="null" 
                                  type="text" 
                                  v-model="character.race"
                    ></b-form-input>
                </div>
                <div class="col-md-3">
                    <label>Powers</label>
                    <b-form-input :state="null" 
                                  type="text" 
                                  v-model="character.powers"
                    ></b-form-input>
                </div>
                <div class="col-md-3">
                    <label>Establishment</label>
                    <b-form-input :state="null" 
                                  type="text" 
                                  v-model="character.establishment"
                    ></b-form-input>
                </div>
                <div class="col-md-3">
                    <label>Occupation</label>
                    <b-form-input :state="null" 
                                  type="text" 
                                  v-model="character.occupation"
                    ></b-form-input>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label>Description</label>
                    <b-form-textarea v-model=character.description
                                      :rows="3"
                    ></b-form-textarea>                                      
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label>Biography</label>
                    <b-form-textarea v-model=character.history
                                      :rows="10"
                    ></b-form-textarea>                                      
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label>Notes</label>
                    <b-form-textarea v-model=character.notes
                                      :rows="3"
                    ></b-form-textarea>                                      
                </div>
            </div>
        </b-modal>
        
        <b-modal id="viewCharacter" size="lg" :ok-only="true">
           <wa-character-sheet :character="character"></wa-character-sheet>
        </b-modal>
        
    </div>
</template>

<script>
    import Vue from 'vue';
    import Character from '../components/CharacterSheet.vue';
    
    Vue.component('wa-character-sheet', Character);
    
    export default {
        data: function() {
            return {
                title: 'New',
                character: {},
                fields: [
                    { key: 'first_name', sortable: true },
                    { key: 'last_name', sortable: true },
                    { key: 'race', sortable: true },
                    { key: 'powers', sortable: true },
                    { key: 'establishment', sortable: true },
                    { key: 'occupation', sortable: true },
                    { key: 'actions' }
                ],
                characters: [],  
            };
        },
        methods: {
            makeSlug: function()
            {
                this.character.slug = (this.character.first_name + '-' + this.character.last_name)
                    .replace(' ','-')
                    .toLowerCase();
            },
            getCharacter: function(slug) {
                let characters = this.characters;
                
                this.title = 'Edit';
                
                for(let index in characters) {
                    if(characters[index].slug === slug)
                        this.character = characters[index];
                }
            },
            newCharacter: function()
            {
                this.title = 'New';
                this.character = {};
            },
            saveCharacter: function() {
                if(this.character.slug === undefined) {
                    this.makeSlug();
                    this.$store.commit('characters/addCharacter', { character: this.character });
                }
                else {
                    let characters = this.characters;
            
                    for(let index in characters) {
                        if(characters[index].slug === this.character.slug) {
                            this.$store.commit('characters/updateCharacter', { character: this.character });
                        }
                    }                   
                }
                this.character = {};
            },
             deleteCharacter: function(slug) {
                let characters = this.characters;
        
                for(let index in characters) {
                    if(characters[index].slug === slug)
                        this.characters.splice(index,1);
                        this.$store.commit('characters/deleteCharacter', { character: this.character })
                }                   
            }
        },
        created: function() {
            this.characters = this.$store.state.characters.characters;
        }
    };
</script>

<style>
    
</style>