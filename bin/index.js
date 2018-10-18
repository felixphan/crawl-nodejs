#!/usr/bin/env node

const program = require('commander');
const index = require('../src/viponProcessor/index');
const colors = require('colors');
const cron = require('node-cron');

program
  .command('vipon')
  .option('-t, --type [value]', 'Crawl by Type (all, upcoming)', '')
  .option('-g, --group [value]', 'Crawl by Group', '')
  .action(function(args) {
    if (args.type !== '') {
      console.log('Crawl by Type %s', colors.green(args.type));
    }
    if (args.group !== '') {
      console.log('Crawl by Group %s', colors.green(args.group));
    }
    var input = {
      type: args.type,
      group: args.group
    };
    cron.schedule('0 0 */6 * * *', function() {
      console.log('CRON every 6 minutes');
      index(input);
    });
    index(input);
  });
program.parse(process.argv);
