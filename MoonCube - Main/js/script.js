const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png", /*This is a file name for logo in /images/ (If you upload new logo with other name, you must change this value)*/
        serverName: "MoonCube Network", /*Server name*/
        serverIp: "mooncube.net", /*Server IP (if you want to add online user counter, you must have true the enable-status and enable-query of server.properties)*/
        discordServerID: "1187310940912357396" /*Your server ID (if you want to add online user counter, you must have enabled Discord server widget)*/
    },
    userSKinTypeInAdminTeam: "bust", /*[full, bust, head, face, front, frontFull, skin]*/
    atGroupsDefaultColors: {
        Zarząd: "rgba(252, 190, 34, 0.5)",  
        Developerzy: "rgba(93, 109, 255, 0.5)",
        Pomocnicy: "rgba(11, 175, 255, 0.5)",
        Budowniczy: "rgba(255, 118, 0, 1)",
        Administracja: "rgba(255, 41, 35, 1)",
    },
    adminTeamPage: {
        Zarząd: [
            {
                inGameName: "DragoCam",
                rank: "Właściciel",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(252, 190, 34)"
            },
        ],
        Administracja: [
            {
                inGameName: "DragoCam",
                rank: "HeadAdmin",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(165, 6, 50, 1)"
        },
            {
                    inGameName: "KKQK",
                    rank: "Admin",
                    skinUrlOrPathToFile: "",
                    rankColor: "rgba(255, 41, 35, 1)"
            },
         {
                    inGameName: "Shixe_823",
                    rank: "Moderaotor",
                    skinUrlOrPathToFile: "",
                    rankColor: "rgba(12, 201, 35, 1)"
        },      

        ],
        Developerzy: [
            {
                inGameName: "Souli_",
                rank: "Minecraft Developer",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "niemiecki_es",
                rank: "Minecraft Developer",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "DragoCam",
                rank: "WEB Developer",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
        ],
        Pomocnicy: [
            {
                inGameName: "DragoCam",
                rank: "Pomocnik",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
        ],
        Budowniczy: [
            {
                inGameName: "Roniel",
                rank: "Główny Budowniczy",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "element99",
                rank: "Budowniczy",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "EnderNietoperPL",
                rank: "Budowniczy",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "IUwUuMaMa",
                rank: "Budowniczy",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
        ]
    }
}

/*Mobile navbar (open, close)*/
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
})

/*FAQs*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else accordionItemBody.style.maxHeight = "0px";
    });
});

/*Config navbar*/
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
/*Config header*/
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/*Config contact*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;

        const apiWidgetUrl = `https://discord.com/api/guilds/1187310940912357396/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "Brak";
        else return (await data.presence_count);
    } catch (e) {
        return "Brak";
    }
}

const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;

        const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        return data.players.online;
    } catch (e) {
        console.log(e);
        return "Brak";
    }
}

const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        return data.id;
    } catch (e) {
        console.log(e);
        return "Brak";
    }
}

const getSkinByUuid = async (username) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${await getUuidByUsername(username)}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
    } catch (e) {
        console.log(e);
        return "Brak";
    }
}

/*IP copy only works if you have HTTPS on your website*/
const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    copyIpButton.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(config.serverInfo.serverIp);
    
            copyIpAlert.classList.add("active");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
            }, 5000);
        } catch (e) {
            console.log(e);
            copyIpAlert.innerHTML = "An error has occurred!";
            copyIpAlert.classList.add("active");
            copyIpAlert.classList.add("error");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
                copyIpAlert.classList.remove("error");
            }, 5000);
        }
    })
}

const setDataFromConfigToHtml = async () => {
    /*Set config data to navbar*/
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    /*Set config data to header*/
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        copyIp();
        /*Set config data to header*/
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    } else if(locationPathname.includes("rules")) {
        copyIp();
    }
    else if(locationPathname.includes("admin-team")) {
        for (let team in config.adminTeamPage) {
            const atContent = document.querySelector(".at-content");
            
            const group = document.createElement("div");
            group.classList.add("group");
            group.classList.add(team);

            const groupSchema = `
                <h2 class="rank-title">${team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div class="users">
                </div>
            `;

            group.innerHTML = groupSchema;

            atContent.appendChild(group);

            for (let j = 0; j < config.adminTeamPage[team].length; j++) {
                let user = config.adminTeamPage[team][j];
                const group = document.querySelector("." + team + " .users");

                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userSkin = config.adminTeamPage[team][j].skinUrlOrPathToFile;

                if(userSkin == "") userSkin = await getSkinByUuid(user.inGameName);
                let rankColor = config.atGroupsDefaultColors[team];

                if(user.rankColor != "") {
                    rankColor = user.rankColor;
                }

                const userDivSchema = `
                    <img src="${await (userSkin)}" alt="${user.inGameName}">
                    <h5 class="name">${user.inGameName}</h5>
                    <p class="rank ${team}" style="background: ${rankColor}">${user.rank}</p>  
                `;

                userDiv.innerHTML = userDivSchema;
                group.appendChild(userDiv);
            }
        }
    }
}
setDataFromConfigToHtml();