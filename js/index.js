/* for Mobius */

function getResponse() {
    /*called when grade button is clicked,
    to retrieve back student's response.*/

    submit();

    var grades = [];
    var correct = [];
    var answers = [];

    if (responseS["electron pair Geometry"] == answerS["electron pair Geometry"]) {
        grades.push('.25');
    }
    else {
        grades.push('0');
    }

    if (responseS["Molecular Geometry"] == answerS["Molecular Geometry"]) {
        grades.push(".25");
    }
    else {
        grades.push("0");
    }

    answers.push(responseS["electron pair Geometry"]);
    correct.push(answerS["electron pair Geometry"]);

    answers.push(responseS["Molecular Geometry"]);
    correct.push(answerS["Molecular Geometry"]);

    delete answerS["electron pair Geometry"];
    delete responseS["electron pair Geometry"];

    delete answerS["Molecular Geometry"];
    delete responseS["Molecular Geometry"];

    console.log(responseS);
    console.log(answerS);

    if (isEquivalent(answerS, responseS)) {
        grades.push('.25');
        grades.push('.25');
        console.log("match");
        alert("Correct!");

    } else {
        grades.push('0');
        grades.push('0');
        alert("Incorrect.");
    }

    answers.push(responseS);
    correct.push(answerS);

    /* array final will be returned */
    var final = [];
    final.push(grades);
    final.push(JSON.stringify(answers));
    final.push(JSON.stringify(correct));

    /* copy shell for display in feedback */
    var shell = document.getElementById("shellDiv");
    var strShell = shell.outerHTML;
    final.push(strShell);

    return JSON.stringify(final);
};

/*Additional functions start from here*/

/* Json data and molecules 
DO NOT edit unless adding or removing molecules
If adding new molecule, add to beginning or end of each list
If removing, be sure to remove from each.
*/

var selected;
const moleculeVars = ['NH_3', 'NF_3', 'CCl_4', 'CO_2', 'H_2O', 'BF_3', 'BCl_3', 'CClF_3', 'SiCl_4', 'CH_4', 'CH_3Cl', 'H_2S', 'PF_3', 'CF_4', 'CH_2Cl_2', 'HCN', 'CHCl_3', 'NH_4^+', 'CFCl_3', 'H_3O^+', 'BeCl_2', 'NO_3^-', 'BrF_3', 'ICl_4^-', 'XeF_2', 'BrF_5', 'SF_6', 'SCl_6', 'SCl_4', 'XeCl_4', 'XeCl_4'];
const molecules = ['NH<sub>3</sub>', 'NF<sub>3</sub>', 'CCl<sub>4</sub>', 'CO<sub>2</sub>', 'H<sub>2</sub>O', 'BF<sub>3</sub>', 'BCl<sub>3</sub>', 'CClF<sub>3</sub>', 'SiCl<sub>4</sub>', 'CH<sub>4</sub>', 'CH<sub>3</sub>Cl', 'H<sub>2</sub>S', 'PF<sub>3</sub>', 'CF<sub>4</sub>', 'CH<sub>2</sub>Cl<sub>2</sub>', 'HCN', 'CHCl<sub>3</sub>', 'NH<sub>4</sub><sup>+</sup>', 'CFCl<sub>3</sub>', 'H<sub>3</sub>O</sub><sup>+</sup>', 'BeCl<sub>2</sub>', 'NO<sub>3</sub><sup>-</sup>', 'BrF<sub>3</sub>', 'ICl<sub>4</sub><sup>-</sup>', 'XeF<sub>2</sub>', 'BrF<sub>5</sub>', 'SCl<sub>6</sub>', 'SF<sub>6</sub>', 'SCl<sub>4</sub>', 'XeCl<sub>4</sub>', 'XeCl<sub>4</sub>'];
const structures = ["linear", "tri_planar-test", "tetrahedral-test", "trigonalbi-test", "octahedral-test"];

/* subsets of data by index with (min,max):  getRandomIntInclusive(min, max); */

/* All molecules: */
var rand = getRandomIntInclusive(0, molecules.length - 1);

/* Partition thirds: 
var rand = getRandomIntInclusive(0, 10); 
var rand = getRandomIntInclusive(11, 22); 
var rand = getRandomIntInclusive(23, molecules.length-1); 
*/

var targetMols = ["HCN"];
const target = false;
//var rand = Math.floor(Math.random() * targetMols.length);
var mol;
var targetInd;

var rand = getRandomIntInclusive(0, molecules.length - 1);

function getRandomIntInclusive(min, max) {
    /* If max out of range, assign new int */
    if (moleculeVars.indexOf(max) < 0) {
        max = moleculeVars.length - Math.floor(Math.random() * (molecules.length - 1));
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

if (target) {
    mol = targetMols[rand];
    targetInd = moleculeVars.indexOf(mol);
    console.log(targetInd);
}
else {
    mol = moleculeVars[rand];
}

document.getElementById("variationMol").innerHTML = molecules[rand];
var m = JSON.parse(data);
var n;

var res = {};
var answerSS = {};
var responseSS = {};

for (let i = 0; i < m.length; i++) {
    if (mol == m[i]["Formula"]) {
        n = m[i];
    }
}


/* For testing: 
console log the jason object with correct molecule 
*/

console.log(n);

function refreshPage() {
    window.location.reload();
}

var atom = ' ';
var target_box;
var currentMolecule = 'tri-bi';

jQuery(document).ready(function () {
    displayMolecule(currentMolecule);
});

/* runs when step one dropdown changes */

function displayMolecule(value) {
    var molecules = document.querySelectorAll(".shell div");
    for (let i = 0; i < molecules.length; i++) {
        molecules[i].style.display = 'none';
    }
    currentMolecule = value;
    document.getElementById(value).style.display = 'block';
}

function clearCanvas() {
    var atoms = document.querySelectorAll("." + currentMolecule + "-atom");
    for (let i = 0; i < atoms.length; i++) {
        atoms[i].innerHTML = "";
        atoms[i].style.display = "";
    }

    var icons = document.querySelectorAll("#element-table button");
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.backgroundColor = "";
    }

    var dots = document.querySelectorAll("#" + currentMolecule + ' #dots > g');
    for (let i = 0; i < dots.length; i++) {
        dots[i].style.display = 'none';
    }

    var x = document.querySelectorAll("svg > circle, g > circle, #legs > g");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'block';
        x[i].style.fill = "";
    }

    answerS = {};
    responseS = {};
}

jQuery(document).ready(function () {

    /* check if cation/anion */

    if (mol.indexOf("-") > -1 || mol.indexOf("+") > -1) {
        console.log("charge");
        document.getElementById("bracketLeft").style.display = 'inline';
        document.getElementById("bracketRight").style.display = 'inline';

        var sign = mol[mol.length - 1];
        document.getElementById("charge").innerHTML = sign;
        document.getElementById("charge").style.display = 'inline';
    }

    /* Runs everytime the atom selection buttons are pressed */

    jQuery("#element-table button").click(function () {
        atom = this.id;

        var icons = document.querySelectorAll("#element-table button");
        for (let i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = "";
        }
        document.getElementById(atom).style.backgroundColor = "#FBFB92";

        var x = document.querySelectorAll("svg > circle, #legs circle");

        for (i = 0; i < x.length; i++) {
            x[i].style.fill = "#FBFB92";
            x[i].style.cursor = "pointer";
        }

    });

    /* Runs everytime the molecule placeholders are pressed (aka the big circles) */
    jQuery(".step2 p").click(function (e) {
        target_box = this.id;
        target_box = target_box.match(/(\d+)/);
        target_box = parseFloat(target_box[0]);
        if (atom != "pair") {

            document.querySelectorAll("#" + currentMolecule + " p")[target_box - 1].innerHTML = atom;
        } else if (atom == "pair" && target_box != 1) {

            document.querySelectorAll("#" + currentMolecule + ' #legs > g')[target_box - 2].style.display = 'none';
            document.querySelectorAll("#" + currentMolecule + " p")[target_box - 1].style.display = 'none';
            document.querySelectorAll("#" + currentMolecule + ' #dots > g')[target_box - 2].style.display = 'inline-flex';
        }
    });

    /* Runs everytime the lone pairs are pressed (aka the dots) */
    jQuery("#dots > g").click(function (e) {

        var dotId = this.id;
        dotId = dotId.match(/(\d+)/);
        dotId = parseFloat(dotId[0]);

        var legs = document.querySelectorAll("#" + currentMolecule + " #legs > g");

        legs[(dotId - 1)].style.display = 'block';

        document.querySelectorAll("#" + currentMolecule + " p")[dotId].style.display = 'inline-flex';
        if (atom != "pair") {
            document.querySelectorAll("#" + currentMolecule + " p")[dotId].innerHTML = atom;
        }
        document.querySelectorAll("#" + currentMolecule + ' #dots > g')[dotId - 1].style.display = 'none';

    });

    /* Runs everytime a molecules bonds are pressed (aka the 1 - 3 lines) */

    jQuery("#legs > g > polygon").click(function (e) {

        var displayCount = 0;
        var groupId = this.id;
        groupNum = groupId.match(/(\d+)/);
        groupNum = parseFloat(groupNum[0]);

        var lines = document.querySelectorAll("#" + currentMolecule + " #legs #leg" + groupNum + ' line');

        var polygons = document.querySelectorAll("#" + currentMolecule + " #legs #leg" + groupNum + ' > g > polygon');
        var amount = polygons.length;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].style.display == 'block') {
                displayCount++;
            }
        }
        if (amount == 0) {
            switch (displayCount) {
                case 1:
                    lines[0].style.display = 'block';
                    lines[1].style.display = 'none';
                    lines[2].style.display = 'block';
                    break;
                case 2:
                    lines[1].style.display = 'block';
                    break;
                case 3:
                    lines[0].style.display = 'none';
                    lines[2].style.display = 'none';
                    break;
                default:
                    lines[0].style.display = 'none';
                    lines[1].style.display = 'block';
                    lines[2].style.display = 'none';
            }
        } else {
            switch (displayCount) {
                case 1:
                    lines[0].style.display = 'block';
                    lines[1].style.display = 'none';
                    lines[2].style.display = 'block';
                    break;
                case 2:
                    lines[1].style.display = 'block';
                    break;
                case 3:
                    for (let i = 0; i < amount; i++) {
                        polygons[i].style.display = 'block';
                    }
                    lines[0].style.display = 'none';
                    lines[1].style.display = 'none';
                    lines[2].style.display = 'none';
                    break;
                default:
                    for (let i = 0; i < amount; i++) {
                        polygons[i].style.display = 'none';
                    }
                    lines[0].style.display = 'block';
                    lines[2].style.display = 'block';
            }
        }

    });

});


/* runs when the "Submit" button is clicked */

function submit() {
    answerS = {};
    responseS = {};
    var getAtoms = [];
    var atoms = document.querySelectorAll("." + currentMolecule + "-atom");
    for (let i = 0; i < 7; i++) {
        if (i >= atoms.length) {
            getAtoms.push("none");
        } else {
            var a = atoms[i].innerHTML;
            if (a.length < 1) {
                getAtoms.push("electron pair");
            } else {
                getAtoms.push(a);
            }
        }
    }

    res["Central Atom"] = getAtoms[0];
    responseS["Central Atom"] = getAtoms[0];
    for (let i = 1; i < getAtoms.length; i++) {
        var a;
        if (getAtoms[i] == "none") {
            a = "no atom";
        } else {
            a = getAtoms[i];
        }

        if (a in responseS) {
            responseS[a] += 1;
        } else {
            responseS[a] = 1;
        }
    }

    res["Terminal Atom 6"] = getAtoms[6];
    res["Terminal Atom 5"] = getAtoms[5];
    res["Terminal Atom 4"] = getAtoms[4];
    res["Terminal Atom 3"] = getAtoms[3];
    res["Terminal Atom 2"] = getAtoms[2];
    res["Terminal Atom 1"] = getAtoms[1];

    var legs = document.querySelectorAll("." + currentMolecule + "-leg");
    nums = [];
    for (let k = 0; k < 6; k++) {
        if (k >= legs.length) {
            nums.push("none");
        } else {
            var ch = legs[k].children;
            var num = 0;
            for (let m = 0; m < ch.length; m++) {

                var i = ch[m].id;

                if (i.includes("line") && i.includes("Zone") == false) {
                    var s = ch[m].getAttribute("style");

                    if (s !== null && s.includes("block")) {
                        num += 1;
                    }
                }
            }
            nums.push(num);
        }
    }

    for (let i = 0; i < 7; i++) {
        if (getAtoms[i] == "electron pair") {
            nums[i - 1] = 'x';
        }
        if (nums[i] < 2) {
            nums[i] = "single";
        }
        if (nums[i] == 2) {
            nums[i] = "double";
        }
        if (nums[i] == 3) {
            nums[i] = "triple";
        }
    }

    for (let i = 0; i < nums.length; i++) {

        var b;

        if (nums[i] == "none") {
            b = "no bond";
        } else {
            b = nums[i];
        }

        if (b in responseS) {
            responseS[b] += 1;
        } else {
            responseS[b] = 1;
        }

    }

    res["Bond 1"] = nums[0];
    res["Bond 2"] = nums[1];
    res["Bond 3"] = nums[2];
    res["Bond 4"] = nums[3];
    res["Bond 5"] = nums[4];
    res["Bond 6"] = nums[5];

    var molGeo = document.getElementById("mol-geometry");
    var g = molGeo.value;

    var gnames = ["tri-bi", "tri-planar", "linear", "tetrahedral", "octahedral", "square-planar", "square-pyramidal", "see-saw", "t-shaped", "bent"];
    var gnames_new = ["Trigonal pyramidal",
        "Trigonal planar",
        "Linear",
        "Tetrahedral",
        "Octahedral",
        "Square planar",
        "Square pyramidal",
        "See-Saw",
        "T-shaped",
        "Bent"
    ];
    var gNew = gnames.indexOf(g);

    res["Molecular Geometry"] = n["Molecular Geometry"];
    responseS["Molecular Geometry"] = gnames_new[gNew];
    answerS["Molecular Geometry"] = n["Molecular Geometry"];

    responseS["Name"] = n["Name"];

    res["Name"] = n["Name"];
    answerS["Name"] = n["Name"];
    responseS["Formula"] = n["Formula"];
    res["Formula"] = n["Formula"];
    answerS["Formula"] = n["Formula"];

    var names = ["tri-bi", "tri-planar", "linear", "tetrahedral", "octahedral"];
    var names_new = ["Trigonal Bipyramidal", "Trigonal planar", "Linear", "Tetrahedral", "Octahedral"];
    var mi = names.indexOf(currentMolecule);

    res["electron pair Geometry"] = names_new[mi];
    responseS["electron pair Geometry"] = names_new[mi];
    answerS["electron pair Geometry"] = names_new[mi];

    answerS["Central Atom"] = n["Central Atom"];


    for (let i in n) {
        if (i.includes("Terminal")) {
            var a;
            if (n[i] == "none") {
                a = "no atom";
            } else {
                a = n[i];
            }
            if (a in answerS) {
                answerS[a] += 1;
            } else {
                answerS[a] = 1;
            }
        }
        if (i.includes("Bond")) {
            var b;
            if (n[i] == "none") {
                b = "no bond";
            } else {
                b = n[i];
            }
            if (b in answerS) {
                answerS[b] += 1;
            } else {
                answerS[b] = 1;
            }
        }

    }

}

/*
check if structures match
*/

function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}
