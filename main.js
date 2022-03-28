let data=[
    {"parentColumn": "",  "childColumn":"A"},
    {"parentColumn": "A", "childColumn":"B"},
    {"parentColumn": "A", "childColumn":"C"},
    {"parentColumn": "B", "childColumn":"D","val":30},
    {"parentColumn": "B", "childColumn":"E","val":50},
    {"parentColumn": "C", "childColumn":"F","val":20},
    {"parentColumn": "C", "childColumn":"G","val":40},
    {"parentColumn": "C", "childColumn":"H","val":60}
];

let r = null;
let m = {};


data.forEach((d) => {
    let node = {name:d.childColumn, children:[], value:d.val};
    m[node.name] = node;
    if(!d.parentColumn){
        r = node
    }
    else{
        m[d.parentColumn].children.push(node);
    }
});


(function checkval(node){
    if(!node.value){
        node.value = 0
        node.children.forEach((c) => {
            node.value += checkval(c);
        });
    }
    return node.value;
})(r);



let dom = document.getElementById("container");
let tmap = echarts.init(dom);


tmap.setOption({
    title: {
    text: 'Gopis Echart',
    left: 'left'
    },
    series: [{
        name: 'echart',
        type: 'treemap',
        label: {
            show: true,
            formatter: '{b}: {c}',
            fontSize: 22
        },
        upperLabel: {
            show: true,
            height: 40,
            formatter: '{b}: {c}',
            fontSize: 22
        },
        levels: [{
            itemStyle: {
                borderWidth: 0
            },
            upperLabel: {
                show: false
            }
        }, {
            itemStyle: {
                borderColor: 'red',
                borderWidth: 18,
                gapWidth: 18
            },
            emphasis: {
                itemStyle: {
                    borderColor: '#jjj'
                }
            }
        }, {
            itemStyle: {
                borderColor: 'lightblue',
                borderWidth: 18,
                gapWidth: 18
            },
            emphasis: {
                itemStyle: {
                    borderColor: '#eee'
                }
            }
        }, {
            itemStyle: {
                color: "black",
                borderWidth: 0
            },
            emphasis: {
                itemStyle: {
                    color: '#eee'
                }
            }
        }],
        data: [r]
    }]
});