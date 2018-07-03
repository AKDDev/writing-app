<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <wa-character-sheet :character="character" :fields="define"></wa-character-sheet>
            </div>
        </div>
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
                character: {},
                define: this.$store.getters['characters/define'],
            };
        },
        methods: {
            getCharacter: function(slug) {
                let characters = this.$store.state.characters.characters;
                
                for(let index in characters) {
                    if(characters[index].slug === slug)
                        this.character = characters[index];
                }
            },
        },
        created: function() {
            this.getCharacter(this.$route.params.slug);
        }
    };
</script>

<style>
    
</style>