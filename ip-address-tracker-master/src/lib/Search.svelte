<script>
    
</script>

<form>
    <label for="searchInput" class="sr-only">
        Search for any IP address or domain
    </label>

    <input type="text" id="searchInput" name="search" placeholder="Search for any IP address or domain">

    <button id="searchBtn">
        <img src="/icon-arrow.svg" alt="">
        <span class="sr-only">Search</span>
    </button>
</form>

<style>
    form {
        position: relative;
        margin-bottom: 1.5rem;
    }

    input {
        font-size: 1.125rem;
        display: block;
        width: 100%;
        height: 3.625rem;
        border: 0;
        padding: 1rem 5rem 1rem 1.5rem;
        border-radius: 0.9375rem;
    }

    button {
        background-color: black;
        width: 58px;
        height: 58px;
        padding: 0;
        border: 0;
        border-radius: 0 0.9375rem 0.9375rem 0;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    button:hover,
    button:focus {
        opacity: 0.8;
    }

    @media (min-width: 992px) {
        form {
            max-width: 555px;
            margin: 0 auto 3rem;
        }
    }
</style>
