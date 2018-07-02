<template>
    <div>
        <h2>{{ character.first_name }} {{ character.last_name}}</h2>
        
        <template v-for="(item, index) in fields">
            <p v-if="item.element === 'p'">
                <strong>{{ index }}</strong><br/>
                {{ character[index] }}
            </p>
            <p v-if="item.type === 'timestamp'">
                <small><strong>{{ index }}</strong> {{ format_date(character[index]) }}</small>
            </p>
            <ul v-if="item.element === 'ul'">
                <template v-for="(meta, i) in item.object">
                    <li v-if="meta.element === 'li' && meta.type === 'string'">
                        <strong>{{ i }}</strong>: {{ character[index][i] }}
                    </li>
                    <li v-if="meta.element === 'li a' && meta.type === 'string'">
                        <strong>{{ i }}</strong>: 
                        <b-btn style="margin-right: 3px;"
                        >{{ character[index][i] }}</b-btn>
                    </li>
                    <li v-if="meta.element === 'li a' && meta.type === 'array'">
                        <strong>{{ i }}</strong>:
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
    export default {
        props: ['character','fields'],
        methods: {
            makeSlug: function(value) {
                return (value).replace(' ','-')
                    .toLowerCase();
            },
            format_date: function(value) {
                return moment(value).format('dddd, MMMM Do YYYY, h:mm:ss A');
            }
        },
    }
</script>

<style>
    
</style>