AFRAME.registerComponent("create-marker", {

    init: async function () {
        var dishes = await this.getmydishes()
        // console.log(dishes)
        var tables = await this.getTables()
        console.log(tables)

        var scene = document.querySelector("#main-scene")

        // feching all information from firebase (dishes)
        dishes.map(dish => {
            // console.log(dish)
            var marker = document.createElement("a-marker")
            marker.setAttribute("id", dish.id)
            marker.setAttribute("type", "pattern")
            marker.setAttribute("url", dish.marker_pattern_url)
            marker.setAttribute("cursor", {
                rayOrigin: "mouse"
            })

            marker.setAttribute("marker-handler", {})
            scene.appendChild(marker)
            // console.log(marker)

            // Getting today's day
            var todaysDate = new Date();
            var todaysDay = todaysDate.getDay();
            // Sunday - Saturday : 0 - 6
            var days = [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday"
            ];

            if (!dish.unavailable_days.includes(days[todaysDay])) {
                // adding 3d model
                var model = document.createElement("a-entity")
                // model-DO1
                model.setAttribute("id", `model-${dish.id}`)
                model.setAttribute("position", dish.model_geometry.position)
                model.setAttribute("rotation", dish.model_geometry.rotation)
                model.setAttribute("scale", dish.model_geometry.scale)
                model.setAttribute("gltf-model", `url(${dish.model_url})`)
                model.setAttribute("gesture-handler", {})
                model.setAttribute("visible", false)
                marker.appendChild(model)
                // console.log(model)

                // ingredients conatiner
                var mainplane = document.createElement("a-plane")
                mainplane.setAttribute("position", { x: 0, y: 0, z: 0 })
                mainplane.setAttribute("width", 1.7)
                mainplane.setAttribute("height", 1.5)
                mainplane.setAttribute("rotation", { x: -90, y: 0, z: 0 })
                mainplane.setAttribute("id", `main_plane-${dish.id}`)
                mainplane.setAttribute("visible", false)
                // console.log(mainplane)
                marker.appendChild(mainplane)

                //creating dsihtitleplane
                var titleplane = document.createElement("a-plane")
                titleplane.setAttribute("position", { x: 0, y: 0.9, z: 0.02 })
                titleplane.setAttribute("width", 1.7)
                titleplane.setAttribute("height", 0.3)
                titleplane.setAttribute("rotation", { x: 0, y: 0, z: 0 })
                titleplane.setAttribute("material", { color: "orange" })
                titleplane.setAttribute("id", `title_plane-${dish.id}`)
                // console.log(titleplane)
                mainplane.appendChild(titleplane)

                // dish title
                var dishTitle = document.createElement("a-entity")
                dishTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 })
                dishTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 })
                dishTitle.setAttribute("text", {
                    font: "monoid",
                    color: "black",
                    width: 1.8,
                    height: 1,
                    align: "center",
                    value: dish.dish_name.toUpperCase()
                })
                dishTitle.setAttribute("id", `dish_title-${dish.id}`)
                // console.log(dishTitle)
                titleplane.appendChild(dishTitle)


                // ingredients
                var ingredients = document.createElement("a-entity")
                ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 })
                ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 })
                ingredients.setAttribute("text", {
                    value: `${dish.ingredients.join("\n\n")}`,
                    width: 2,
                    align: "center",
                    font: "monoid",
                    align: "left",
                    color: "black"
                })
                ingredients.setAttribute("id", `ingredients-${dish.id}`)
                mainplane.appendChild(ingredients);
                // console.log(ingredients)


                //Plane to show the price of the dish
                var pricePlane = document.createElement("a-image");
                pricePlane.setAttribute("id", `price-plane-${dish.id}`);
                pricePlane.setAttribute(
                    "src", "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
                );
                pricePlane.setAttribute("width", 0.8);
                pricePlane.setAttribute("height", 0.8);
                pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
                pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
                pricePlane.setAttribute("visible", false);

                //Price of the dish
                var price = document.createElement("a-entity");
                price.setAttribute("id", `price-${dish.id}`);
                price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
                price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
                price.setAttribute("text", {
                    font: "mozillavr",
                    color: "white",
                    width: 3,
                    align: "center",
                    value: `Only\n$${dish.price}`
                });

                pricePlane.appendChild(price);
                marker.appendChild(pricePlane)

                // console.log(pricePlane)
            }

        })
    },

    getmydishes: async function () {
        return await firebase.firestore()
            .collection("dishes").get()
            .then(snaspshot => {
                return snaspshot.docs.map(doc =>
                    doc.data()
                )
            })


    },

    getTables: async function () {
        return await firebase.firestore()
            .collection("tables")
            .get()
            .then(snaspshot => {
                return snaspshot.docs.map(doc =>
                    doc.data()
                )

            })
    }

})

