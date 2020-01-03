<div id="app">
  <h1>Nacho</h1>

  {#if quotes}
  <ul style="margin-top:0.2em;">
	  {#each quotes as { id, content }, i}
		<li>{@html content.rendered}</li>
	  {/each}
  </ul>
  {:else}
  <div>
    No quotes
  </div>
  {/if}

  <div style="margin-top:0.2em;">
    <button on:click={getMore}>Load more</button>
  </div>

  <div style="margin-top:0.8em;">
    <a href="../">Back</a>
  </div>
</div>

<script type="text/javascript">
import { onMount } from 'svelte';

import { corsAnywhere } from '../../lib/utils';

const API_ENDPOINT_URL = 'https://quotesondesign.com/wp-json/wp/v2/posts/';

let quotes = [];

const getMore = async () => {
  console.log('[Svelte.App] ++++ getMore()');

  let url = `${API_ENDPOINT_URL}?orderby=rand&per_page=3`;
  let options = {};

  if (!('NODE_ENV' in process.env) || process.env.NODE_ENV !== 'production') {
    [{ url, options } = corsAnywhere(url, options)];
  }

  const res = await fetch(url, options);
  const data = await res.json();
  quotes = quotes.concat([...data]);

  console.log('[Svelte.App] quotes: ', quotes);
}

onMount(async () => {
  await getMore();
});
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}
</style>
