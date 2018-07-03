<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>
                    Characters
                     <small>
                         <b-btn to="character/new">
                            <i class="far fa-plus-square fa-fw"></i> 
                         </b-btn>
                     </small>
                </h1>
                <b-table hover :items="table" :fields='fields'>
                    <template slot="actions" slot-scope="data">
                        <b-btn :to="'character/' + data.item.slug"
                        >
                            <i class="far fa-eye fa-fw"></i>
                        </b-btn>
                        <b-btn :to="'character/edit/' + data.item.slug"
                        >
                            <i class="far fa-edit fa-fw"></i>
                        </b-btn>
                        <b-btn @click="deleteCharacter(data.item.slug)"
                        >
                            <i class="far fa-trash-alt fa-fw"></i>
                        </b-btn>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                characters: [],  
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
            deleteCharacter: function(slug) {
                let characters = this.characters;
                console.log(slug);
                for(let index in characters) {
                    if(characters[index].slug === slug) {
                        this.$store.commit('characters/deleteCharacter', { character: characters[index] })
                    }
                }                   
            },
        },
        created: function() {
            this.characters = this.$store.state.characters.characters;
        }
    };
</script>

<style>
    
</style>