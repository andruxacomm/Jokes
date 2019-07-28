<template>
    <button class="btn"
            @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'Btn',
    }
</script>

<style lang="scss">
    .btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 200px;
        width: 100%;
        height: 55px;
        padding: 0 1.5em;
        cursor: pointer;

        color: $white;
        background-color: $red;
        border: 1px solid $red;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 400;
        //font-family: $BebasNeue;
        transition: background-color ease .25s;

        border-radius: 3px;

        &[disabled="disabled"] {
            background-color: #e8e8e8;
            color: #000;
            border-color: transparent;

            &:after {
                border-color: transparent;
            }
        }

        &:after {
            position: absolute;
            content: "";
            top: 50%;
            right: 15px;
            display: inline-block;
            vertical-align: middle;
            width: 10px;
            height: 10px;
            border-left: 2px solid $white;
            border-bottom: 2px solid $white;
            transform: translate(-50%,-50%) rotate(-135deg);
            transition: transform .15s ease;
        }

        &--transparent {
            background-color: $white;
            color: #5B5B5B;

            &:after {
                border-color: #5B5B5B;
            }
        }

        @include below($sm-desktop) {
            height: 45px;
            font-size: 16px;
        }

        @include below($phone-wide) {
            height: 40px;
            font-size: 14px;
        }

        @include below($phone) {
            height: 35px;
        }
    }
</style>