let boxSelection = [];

const boxes = {
  as: {
    title: "Artist's Special",
    heroes: [
      "Alt. Daredevil",
      "Daredevil Elektra",
      "Marshall Bullseye",
      "Old Man Hawkeye",
      "Old Man Logan",
      "Alt. Spider-Man",
    ],
    zombies: [],
    xheroes: [],
    xzombies: [],
  },
  core: {
    title: "Core",
    heroes: [
      "Ms. Marvel",
      "Thor",
      "Scarlet Witch",
      "Black Panther",
      "Doctor Strange",
      "Spider-Man",
    ],
    zombies: [
      "Deadpool",
      "Iron Man",
      "Captain America",
      "Captain Marvel",
      "Wasp",
      "Hulk",
    ],
    xheroes: [],
    xzombies: [],
  },
  cotss: {
    title: "Sinister Six",
    heroes: ["Venom", "Black Cat", "Scorpion", "Kraven", "Sandman", "Mysterio"],
    zombies: [
      "Doctor Octopus",
      "Electro",
      "Green Goblin",
      "Lizard",
      "Vulture",
      "Rhino",
    ],
    xheroes: ["Green Goblin", "Rhino"],
    xzombies: ["Mysterio", "Venom"],
  },
  hr: {
    title: "Hydra Ressurection",
    heroes: ["Vision", "Ant-Man", "Black Widow", "She-Hulk"],
    zombies: ["Falcon", "Hawkeye", "Quicksilver", "Loki"],
    xheroes: ["Falcon", "Quicksilver", "Red Skull"],
    xzombies: ["Black Widow", "She-Hulk"],
  },
  f4: {
    title: "Fantastic 4",
    heroes: ["Human Torch", "Invisible Woman", "Mister Fantastic", "The Thing"],
    zombies: ["Doctor Doom", "Black Bolt", "Super-Skrull", "Namor"],
    xheroes: ["Super-Skrull"],
    xzombies: ["Mister Fantastic", "Invisible Woman", "The Thing"],
  },
  gotg: {
    title: "Guardians of the Galaxy",
    heroes: ["Nova", "Mantis", "Groot", "Gamora"],
    zombies: ["Rocket", "Drax", "Nebula", "Star-Lord"],
    xheroes: ["Rocket", "Drax", "Nebula"],
    xzombies: ["Mantis", "Thanos"],
  },
  gtd: {
    title: "Galactus",
    heroes: ["Silver Surfer"],
    zombies: ["Silver Surfer"],
    xheroes: [],
    xzombies: [],
  },
  sg: {
    title: "Stretch Goals",
    heroes: [
      "Cyclops",
      "Vulture",
      "Sabretooth",
      "Deadpool",
      "Electro",
      "Iron Man",
      "Lizard",
      "Juggernaut",
      "Dark Phoenix",
      "Hulk",
      "Wasp",
      "Psylocke",
      "Black Bolt",
      "Captain America",
      "Gambit",
      "Captain Marvel",
      "Iceman",
      "Kitty Pryde",
      "Nightcrawler",
      "Moon Knight",
      "Carnage",
      "Spider-Woman",
      "Blade",
      "Daredevil",
      "Winter Soldier",
      "Elektra",
      "Bullseye",
      "Beast",
      "Shang-Chi",
      "Black Knight",
      "Hawkeye",
      "Doctor Octopus",
      "War Machine",
      "Star-Lord",
      "Namor",
      "Luke Cage",
      "Emma Frost",
      "Jessica Jones",
      "Doctor Doom",
      "Kingpin",
      "Baron Zemo",
      "Crossbones",
      "Loki",
      "Morbius",
      "Miles Morales",
      "Ghost Rider",
    ],
    zombies: [
      "Storm",
      "Magneto",
      "Ms. Marvel",
      "Doctor Strange",
      "Wolverine",
      "Kraven",
      "Thor",
      "Human Torch",
      "Mystique",
      "Rogue",
      "Scarlet Witch",
      "Colossus",
      "Nightcrawler",
      "Daredevil",
      "Gambit",
      "Nova",
      "Elektra",
      "Kingpin",
      "Scorpion",
      "Moon Knight",
      "Giant-Man",
      "Bullseye",
      "Black Cat",
      "Luke Cage",
      "Gamora",
      "Beast",
      "Winter Soldier",
      "Multiple Man",
    ],
    xheroes: [],
    xzombies: [],
  },
  ss: {
    title: "Sentinal Strike",
    heroes: ["Professor X", "Nana"],
    zombies: ["Professor X"],
    xheroes: [],
    xzombies: [],
  },
  xm: {
    title: "X-men Core",
    heroes: ["Magneto", "Storm", "Mystique", "Colossus", "Rogue", "Wolverine"],
    zombies: [
      "Juggernaut",
      "Dark Phoenix",
      "Cyclops",
      "Psylocke",
      "Iceman",
      "Sabretooth",
    ],
    xheroes: [],
    xzombies: [],
  },
};

function toggleBox(el) {
  const { name: boxId, checked } = el.target;

  const changedBox = boxSelection.find((box) => box.boxId === boxId);
  changedBox.checked = checked;

  localStorage.setItem("boxes", JSON.stringify(boxSelection));
}

function populateBoxSelection(boxArray) {
  boxArray.forEach((box) => {
    const { boxId, checked } = box;
    const boxContainer = document.getElementById("boxes");

    const checkboxWrapper = document.createElement("div");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = checked;
    input.name = boxId;
    input.id = boxId;
    input.addEventListener("change", toggleBox);

    const label = document.createElement("label");
    label.innerHTML = boxes[boxId].title;
    label.htmlFor = boxId;

    checkboxWrapper.appendChild(input);
    checkboxWrapper.appendChild(label);
    boxContainer.appendChild(checkboxWrapper);
  });
}

const returnUserBoxes = localStorage.getItem("boxes");

if (!returnUserBoxes) {
  const boxIds = Object.keys(boxes);
  const mappedBoxIds = boxIds.map((boxId) => {
    return { boxId, checked: true };
  });
  localStorage.setItem("boxes", JSON.stringify(mappedBoxIds));
  boxSelection = mappedBoxIds;
} else {
  boxSelection = JSON.parse(returnUserBoxes);
  populateBoxSelection(boxSelection);
}

function showChosenChars(selectedChars) {
  document.getElementById("placeholderParagraph")?.remove();
  const charListEl = document.getElementById("charlist");
  charListEl.innerHTML = "";

  selectedChars.forEach(({ charName, boxName }) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = `${charName} from ${boxName}`;

    charListEl.appendChild(newLi);
  });
}

function pickChars(count, type) {
  const boxStorage = boxSelection.filter((box) => box.checked);
  const charTypes =
    type === "z" ? ["zombies", "xzombies"] : ["heroes", "xheroes"];

  const charPool = boxStorage.reduce((acc, box) => {
    const chosenBox = boxes[box.boxId];
    const chars = [...chosenBox[charTypes[0]], ...chosenBox[charTypes[1]]].map(
      (charName) => {
        return {
          boxName: chosenBox.title,
          charName,
        };
      }
    );
    return [...acc, ...chars];
  }, []);

  if (charPool.length < count) {
    alert(
      `You selected to randomize ${count} ${charTypes[0]}, but your selected box(es) only contain(s) ${charPool.length} of them`
    );
    return;
  }

  const selectedChars = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    selectedChars.push(charPool.splice(randomIndex, 1)[0]);
  }

  showChosenChars(selectedChars);
}

const buttons = document.querySelectorAll("button");
buttons.forEach(function (el) {
  el.addEventListener("click", (el) => {
    const [count, type] = el.target.id;
    pickChars(parseInt(count), type);
  });
});
