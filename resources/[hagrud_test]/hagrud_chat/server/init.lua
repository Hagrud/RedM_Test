--Citizen.CreateThread(function()
--   while true do
--       Citizen.Wait(0)

--		local countPlayer = MySQL.Sync.fetchScalar("SELECT COUNT(1) FROM players") -- get count from table in mysql 
--		local countPlayerText = 'YAHOU !! ligne en mysql = ' .. countPlayer -- friendly text 
--		print(countPlayerText) -- print in console 
--		break -- stop my request
--   end
--end)