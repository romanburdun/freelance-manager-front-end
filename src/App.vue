<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">

  @import '../node_modules/vue-material-design-icons/styles.css';
  @import url('https://fonts.googleapis.com/css?family=Galada|Open+Sans|Roboto&display=swap');

  @import 'src/styles/controls';
  @import './styles/cards--container';
  @import './styles/table.scss';
  @import "./styles/page--container";
  @import "./styles/page";
  @import "./styles/dark";

  @import "../node_modules/quill/dist/quill.snow.css";
  @import "./styles/typography";


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &::-moz-focus-inner {
    border:0;
    outline: none;
  }

  &:focus {
    outline: none;
  }
}



  .text {
    font-weight: lighter;
    font-size: 1rem;
    color: $text_main;
  }

  .quillWrapper{
    border: none;
    border-radius: 10px;
    box-shadow: $shadows;
    background: lighten($background,2%);
  }

  .ql-snow {
    border: none !important;
  }

  .ql-toolbar .ql-snow {
    background: $background;

    border-radius: 10px;

  }

  .ql-container.ql-snow {
    height: 48rem;
    background: $background;

    border-radius: 10px;
    /*border: none !important;*/

  }

  .ql-editor {
    color: $text_main;
  }


  .vdp-datepicker {


    div {
      input[type="text"] {
        width: 100%;

      }
    }

    header {
      span {
        color: $dark_text !important;
      }
    }

    @media(min-width: 1440px) {
      margin-right: 2rem;
    }
  }

  .vdp-datepicker * {
    border-radius: 10px;
  }

  .vdp-datepicker__calendar {
    background: $background !important;
    border-radius: 10px;
    color: $text_main;
     .cell.day {
       color: $primary;
       &:hover {
         border: 1px solid $primary !important;
       }
     }
  }



  .vdp-datepicker__calendar {
  font-family: 'Open Sans';

}


.vdp-datepicker__calendar {
    .cell.day.selected {
      background: $primary;
      color: white;
      &:hover {
        background: lighten($primary, 5%);
      }

      }

  .cell.month.selected {
    background: $primary;
    color: white;

    &:hover {
      background: lighten($primary, 5%);
    }
  }

    .cell:not(.blank):not(.disabled).day{

      &:hover {
        border: 1px solid $primary;
      }

    }
  }
</style>
