fx_version "adamant"
games {"rdr3"}
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
version '3.2.0'

server_script{
    "@mysql-async/lib/MySQL.lua", -- Mysql-async
	'server/server.js'
}

client_script{ 
	'client/client.js'
}

files {
}
