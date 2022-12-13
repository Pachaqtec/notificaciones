/* eslint-disable */
module.exports = {
	apps: [
		{
			name: 'app1',
			script: './app.js',
			watch: false,
			max_memory_restart: '1000M',
			exec_mode: 'cluster',
			instances: 1,
			cron_restart: '59 23 * * *',
			node_args: '-r dotenv/config',
		},
	],
};
