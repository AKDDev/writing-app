<template>
    <div>
        <h2>{{ character.first_name }} {{ character.last_name}}</h2>
           <p>
               <strong>Race:</strong> {{ character.race }}<br/>
               <strong>Powers:</strong> {{ character.powers }}<br/>
               <strong>Establishment:</strong> {{ character.establishment }}<br/>
               <strong>Occupation:</strong> {{ character.occupation }}<br/>
           </p>
           <p>{{ character.description }}</p>
           <h3>Biography</h3>
           <p>{{ character.history }}</p>
           <h3>Notes</h3>
           <p>{{ character.notes }}</p>
    </div>
</template>

<script>
    export default {
        props: ['character']
    }
</script>

<style>
    
</style>