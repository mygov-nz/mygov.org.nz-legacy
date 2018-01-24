import 'babel-polyfill';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
});
