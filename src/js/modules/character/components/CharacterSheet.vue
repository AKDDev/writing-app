<template>
    <div>
        <h1>{{ character.first_name }} {{ character.last_name}}</h1>
        
        <template v-for="(item, index) in fields">
            <p v-if="item.type === 'string' && item.type === 'p'" >
                <strong>{{ title(index) }}</strong><br/>
                {{ character[index] }}
            </p>
            <div v-if="item.type === 'markdown'"
                      v-html="markdown(character[index], title(index))"
            >
            </div>
            <p v-if="item.type === 'timestamp'">
                <small><strong>{{ title(index) }}</strong> {{ format_date(character[index]) }}</small>
            </p>
            <ul v-if="item.type === 'object'">
                <template v-for="(meta, i) in item.object">
                    <li v-if="meta.element === 'li' && meta.type === 'string'">
                        <strong>{{ title(i) }}</strong>: {{ character[index][i] }}
                    </li>
                    <li v-if="meta.element === 'li a' && meta.type === 'string'">
                        <strong>{{ title(i) }}</strong>: 
                        <b-btn style="margin-right: 3px;"
                        >{{ character[index][i] }}</b-btn>
                    </li>
                    <li v-if="meta.element === 'li a' && meta.type === 'array'">
                        <strong>{{ title(i) }}</strong>:
                        <b-btn v-for="name in character[index][i].split(',')" 
                               :key="makeSlug(name)"
                               style="margin-right: 3px;"
                        >{{ name }}</b-btn>
                    </li>
                </template>
            </ul>
        </template>
    </div>
</template>

<script>
    import moment from 'moment';
    let md = require('markdown-it')();
    export default {
        props: ['character','fields'],
        methods: {
            makeSlug: function(value) {
                return (value).replace(' ','-')
                    .toLowerCase();
            },
            format_date: function(value) {
                return moment(value).format('dddd, MMMM Do YYYY, h:mm:ss A');
            },
            title: function(value) {
                return value.replace('_',' ').capitalize();
            },
            markdown: function(value, title) {
                value = '## '+ title + '\n' + value;
               return md.render(value);
            }
        },
    }
</script>

<style>
    
</style>