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
                <b-table hover :items="table" :fields='fields'>
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
                <template v-for="(item, index) in define">
                    <div :class="'col-md-' + item.size"
                         v-if="! item.private && item.type === 'string'"
                    >
                        <div class="form-group">
                            <label>{{ label(index) }}</label>
                            <b-form-input :state="null"
                                          type="text" 
                                          v-model="character[index]"
                            >
                            </b-form-input>
                        </div>
                    </div>
                    <div :class="'col-md-' + item.size"
                         v-if="! item.private && item.type === 'array'"
                    >
                        <div class="form-group">
                            <label>{{ label(index) }}</label>
                            <b-form-input :state="null"
                                          type="text" 
                                          v-model="character[index]"
                            >
                            </b-form-input>
                        </div>
                    </div>
                    <div :class="'col-md-' + item.size"
                         v-if="! item.private && item.type === 'markdown'"
                    >
                        <div class="form-group">
                            <label>{{ label(index) }}</label>
                            <b-form-textarea :state="null"
                                          type="text" 
                                          v-model="character[index]"
                                          :rows="6"
                            >
                            </b-form-textarea>
                        </div>
                    </div> 
                    <template v-if="! item.private && item.type === 'object'" 
                              v-for="(meta, i) in item.object"
                    >
                        <div :class="'col-md-' + meta.size"
                             v-if="! meta.private && meta.type === 'string'"
                        >
                            <div class="form-group">
                                <label>{{ label(i) }}</label>
                                <b-form-input :state="null"
                                              type="text" 
                                              v-model="character[index][i]"
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div :class="'col-md-' + meta.size"
                             v-if="! meta.private && meta.type === 'array'"
                        >
                            <div class="form-group">
                                <label>{{ label(i) }}</label>
                                <b-form-input :state="null"
                                              type="text" 
                                              v-model="character[index][i]"
                                >
                                </b-form-input>
                            </div>        
                        </div>
                    </template>
                </template>
            </div>
            
        </b-modal>
        
        <b-modal id="viewCharacter" size="lg" :ok-only="true">
           <wa-character-sheet :character="character" :fields="define"></wa-character-sheet>
        </b-modal>
        
    </div>
</template>

<script>
    import Vue from 'vue';
    import Character from '../components/CharacterSheet.vue';
    import moment from 'moment';
    
    Vue.component('wa-character-sheet', Character);
    
    export default {
        data: function() {
            return {
                title: 'New',
                character: {},
                characters: [],  
                row: 0,
                define: this.$store.getters['characters/define'],
            };
        },
        computed: {
            table: function() {
                let characters = this.characters,
                    table = [],
                    define = this.define;
                    
                    for(let c in characters) {
                        let temp = {};
                        for(let index in define) {
                            let row = define[index];
                            
                            if(row.id) {
                                temp[index] = characters[c][index];
                            }
                            
                            if(row.list) {
                                temp[index] = characters[c][index];
                            }
                            
                            if(row.type === 'object') {
                                for(let i in row.object) {
                                    let item = row.object[i];
                                    
                                    if(item.list) {
                                        temp[i] = characters[c][index][i];
                                    }
                                }
                            }
                        }
                        table.push(temp);
                    }

                return table;
            },
            fields: function(){
                let fields = [],
                    define = this.define;
                
                    for(let index in define) {
                        let row = define[index];
                        
                        if(row.list) {
                            fields.push({
                               key: index, 
                               sortable: true,
                            });
                        }
                        
                        if(row.type === 'object') {
                            for(let i in row.object) {
                                let item = row.object[i];
                                
                                if(item.list) {
                                    fields.push({
                                       key: i, 
                                       sortable: true,
                                    });
                                }
                            }
                        }
                    }
                    fields.push({
                        key: 'actions'
                    });
                
                return fields;   
            }
        },
        methods: {
            label: function(label) {
                return label.replace('_',' ')
                    .capitalize();
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
                this.character = this.defineCharacter();
            },
            saveCharacter: function() {
                if(this.character.slug === undefined) {
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
                
                this.character = this.defineCharacter();
            },
             deleteCharacter: function(slug) {
                let characters = this.characters;
        
                for(let index in characters) {
                    if(characters[index].slug === slug)
                        this.characters.splice(index,1);
                        this.$store.commit('characters/deleteCharacter', { character: this.character })
                }                   
            },
            defineCharacter: function() {
                let define = this.define,
                    character = {};
                
                for(let index in define) {
                    let item = define[index];
                    
                    if(! item.private) {
                        if(item.type === 'object') {
                            character[index] = {};
                            for(let i in item.object) {
                                character[index][i] = '';
                                
                            }
                        }
                        else {
                            character[index] = '';  
                        }
                    }
                }
                return character;
            }
        },
        created: function() {
            this.characters = this.$store.state.characters.characters;
            this.character = this.defineCharacter();
        }
    };
</script>

<style>
    
</style>