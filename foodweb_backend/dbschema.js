let db = {
    users:[
        {
            id : "356276317",
            name : "Tinotenda Chitsva",
            email : "tinotenda@gmail.com",
            userName : "Tino",
            familyName : "Chitsva",
            pictureId : "1232ADS",
            aboutMe : "I love cooking Sadza",
            numberOfFollowers : 1200,
            numberOfFollowing : 100,
            numberOfPostedRecipe : 40,
            numberOfFavouriteRecipes : 2,
            imageString : "evwertqeftbqerc",
            image : "100101010010111101011",
            active: "true", //account in use other wise false
            createdAt: "2019-11-24T22:22:16.558Z"
        }

    ],
    blockedUsers : [
        {
            id : "KJAGDFBALGIUDF",
            blockerUserId : "ADFVEARDCDAERSS",
            blockedUserId : "2423vsFGSVsbfgfv"
        }
    ],
    messages: [
        {
            id : "245234f",
            senderUserId : "ATBAEFRA23",
            receiverUserId : "aerbar34q42314",
            messageText : "Have you seen my new recipe",
            read : "false",
            imageId : "fairegfewy8732",
            videoId : "FJTUEFKJAYUEWFKAU",
            createdAt: "2019-11-24T22:22:16.558Z"
        }

    ],
    recipes:[
        {
            id : "2452342535",
            userId : "356276317",
            likesCount: 0,
            commentsCount : 0,
            rating : 4.5,
            mealType : "tea",
            dietHealth : "health",
            worldCuisine : "African",
            mealName : "lunch",
            description : "you can eat this any time",
            imageBase64 : "AS:21:32",
            imageString : "FVARVAEBAFEA",
            image : "1010101010101111",
            videoId : "42523523",
            createdAt: "2019-11-24T22:22:16.558Z"
        }

    ],
    favorites: [
        {
            id : "AFVEDRSA2453RVWERV",
            userId : "FVSAFAVDFAD1541F",
            recipeId : "VAREVARSAQVDFEFADR"
        }
    ],
    comments:[
        {   id: "KJHKABDCALFAERVAD",
            userName: 'user',
            senderId: "1313534123",
            recipeId: "jaksdjahgkdaksdhakdgsk",
            commentText: 'nice recipe',
            likesCount = 0,
            createdAt: "2019-11-24T22:22:16.558Z"
        }        
    ],
    notifications: [
        {
            id : "KJGFKGKJLDHLAD",
            senderUserId: "JKHGKAYHDFKAUYDKIWBD",
            notifiedUserId : "GKJGHMJGDAUKSDYU",
            notificationText : "T1 Has sent you a message",
            type : "like | comment | recipe | message", 
            isViewed = "false | true"
        }
    ],
    
    reviews: [
        {
            id : "4254GWEFSVA",
            recipeId : "3245232DSA", 
            oneStartCount : 0,
            twoStartCount : 0,
            threeStartCount : 0,
            fourStartCount : 0,
            fiveStartCount : 0
        }
    ],
    recipeLikes: [
        {
            id : "JHFADVAKDHAMJCHAH",
            userName: "user1",
            userId: "WVWER41242",
            recipeId: "FB0WPpX25ES08N0hAL7NRbuCfyq1"
        },
        {
            id: "KJHGKSKADGYDU",
            userName: "user2",
            userId: "SGBSRTBS4343",
            recipeId: "FB0W25ESDFSFAERERAL7NRbuCfyq1"
        }

    ],
    videoLikes: [
        {
            id : "GFJHGFJhgfjgfj",
            videoId : "KHJGKJHutyfkuysk", 
            userName : "Tatenda",
            userId : "KHJGKuykguygkhjl"
        },
        {
            id : "tsdhJFKUYrgFJhgfj",
            videoId : "KHJGKJHutyfkuysk", 
            userName : "Tatenda",
            userId : "Kuyzfgdfgkguygkhjl"
        }

    ],
    deactivatedAccounts: [
        {
            id : "DAERWRVQ343",
            userId : "245265WTBSBGF"
        },
        {
            id : "DAERAFBERATBE",
            userId : "ADBWRSFBDF"
        }
    ],
    images: [
        {
            id : "JHGKJHGKGEKCABRV",
            userId : "JLGIUGLI7TGLIUL",
            imageCaption : "Best Recipe",
            imageBase64 : "ADVEB4ACC",
            imageString : "KJAsJSAKCJDSK",
            image : "10110100100101",
            type : "message | recipe | post",
            createdAt: "2019-11-24T22:22:16.558Z"
        }
    ],
    videos: [
        {
            id : "GFJH6568VHGV",
            userId : "KJHGKUUYVY4",
            recipeId : "JHGKAYUFKXHJSAV",
            videoUrl : "https://asure.storage.com",
            type: "message | recipe | post | liveStream",
            likesCount : 0,
            viewsCount : 0,
            createdAt: "2019-11-24T22:22:16.558Z"
        }
    ]
}
