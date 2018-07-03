<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ title }} Character
                </h1>
                <p>
                    <b-btn @click="saveCharacter()">
                        <i class="far fa-save fa-fw"></i>
                     </b-btn>
                </p>            
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
                <p>
                    <b-btn @click="saveCharacter()"
                    >
                        <i class="far fa-save fa-fw"></i>
                     </b-btn>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                define: {},
                character: {},
            };
        },
        computed: {
            title: function() {
                if(this.$route.path === '/character/new') {
                    return 'New';
                }
                
                return 'Edit';
            }
        },
        methods: {
            getCharacter: function(slug) {
                let characters = this.$store.state.characters.characters;
                
                this.title = 'Edit';
                
                for(let index in characters) {
                    if(characters[index].slug === slug)
                        return characters[index];
                }
            },
            label: function(label) {
                return label.replace('_',' ')
                    .capitalize();
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
                
                this.$router.push('/characters');
                
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
        mounted: function() {
            this.define = this.$store.getters['characters/define'];
            
            if(this.$route.path === '/character/new') {
                this.character = this.defineCharacter();
            }
            else {
                this.character = this.getCharacter(this.$route.params.slug)
            }
        }
    };
</script>

<style>
    
</style>