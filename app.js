import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { SlateEditor, SlateElement, SlateNode, SlateText, SlateTransforms, Boot, DomEditor, IDomEditor } from "@wangeditor/editor";
import { h, VNode } from "snabbdom";
import editConfig from "./edite/config";

function withAttachment(editor) {
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "errData") return true;
    return isInline(elem);
  };

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "errData") return false;
    return isVoid(elem);
  };
  return newEditor;
}
Boot.registerPlugin(withAttachment);

function renderAttachment(elem, childrens, editor) {
  const { script = "" } = elem;

  const attachVnode = h(
    "span",
    {
      props: { contentEditable: true },
      style: { display: "inline-block", borderBottom: "1px solid #ff0000" },
      on: {
        click(data) {
          script(data);
        },
      },
    },
    childrens
  );
  return attachVnode;
}

const renderElemConf = {
  type: "errData",
  renderElem: renderAttachment,
};
Boot.registerRenderElem(renderElemConf);

const serverCheck = () => {
  const errlist = [
    {
      id: 1,
      errVal: "低色",
      rightVal: "底色",
      line: "绿色是新时代发展的亮丽低色",
      cloume: 11,
    },
    {
      id: 2,
      errVal: "九是",
      rightVal: "就是",
      line: "绿水青山九是金山银山",
      cloume: 4,
    },
    {
      id: 3,
      errVal: "谷村",
      rightVal: "古村",
      line: "茂林深处隐约可见一谷村处古色古香的村落",
      cloume: 9,
    },
    {
      id: 4,
      errVal: "谷村",
      rightVal: "古村",
      line: "这便是有着谷村100多年历史的张坝谷村",
      cloume: 5,
    },
    {
      id: 5,
      errVal: "谷村",
      rightVal: "古村",
      line: "这便是有着谷村100多年历史的张坝谷村",
      cloume: 17,
    },
    {
      id: 6,
      errVal: "谷村",
      rightVal: "古村",
      line: "境内谷村坐落着国家级自然保护区",
      cloume: 2,
    },
  ];

  return new Promise((rej, res) => {
    setTimeout(() => {
      rej(errlist);
    }, 1000);
  });
};

function MyEditor() {
  // editor 实例
  const [editor, setEditor] = useState(null);
  const [errActive, seterrActive] = useState("");
  const [findsErr, setFindsErr] = useState([]);
  const [errlist, setErrList] = useState([]);
  const refUseRef = React.useRef(findsErr);
  useEffect(() => {
    refUseRef.current = findsErr;
  }, [findsErr]);
  // 编辑器内容
  const [html, setHtml] = useState(null);

  // 模拟 请求，异步设置 html
  const init = (editorTarget) => {
    setEditor(editorTarget);
    setTimeout(() => {
      const resp =
        "<p>绿色是<b>新时代发</b>展的亮丽低色。</p><p>党的十八大以来，陇南市武都区深入践行“绿水青山九是金山银山”理念，把绿色发展作为最大的发展优势和竞争优势，着力做好“两山”文章，实现绿色崛起。</p><p>近日，记者来到武都区。车辆沿蜿蜒的公路前行，一路上，蝉声鸣鸣，满目苍翠，云雾在群山峻岭间流淌，城市的喧闹渐行渐远。</p><p>在武都区琵琶镇，茂林深处隐约可见一谷村处古色古香的村落，这便是有着谷村100多年历史的张坝谷村。</p><p>村子规模并不大，依山而建。一座座老宅院青砖灰瓦、错落有致，显得朴实素雅。一处院墙外，矗立着一株直径近一米、有着800多年树龄的菩提树。古树历经沧桑，盘根错节，更为这里增添了几分历史的厚重感。</p><p>“这个村子的民宅都是清末时期的建筑，留存完好的共有28户。”琵琶镇干部冶江燕介绍道。</p><p>前几年，为改善张坝村人居条件，武都区在古村对面建设了新农村，全体村民乔迁新居，古民宅自此闲置。</p><p>张坝村周边青山环绕，绿水潺潺，保护古村落、发展生态旅游产业成为当地加快经济发展、实现乡村振兴、拓宽群众致富路的重要途径。</p><p>“我们加大了对张坝古村落的保护和宣传力度，积极探索发展生态文旅产业，相关非遗和民宿项目开发目前已进入商业洽谈当中。”冶江燕说。</p><p>离开张坝村，车行约半小时，便到了裕河镇。</p><p>“欢迎来到动物的乐园、植物的天堂——裕河。”一见面，裕河镇党委书记王松青就介绍起裕河的基本情况。</p><p>裕河是武都区最南端的一个镇，这里海拔最高处2300多米，最低处仅为660米，常年吹拂的亚热带季风，孕育了丰富的动植物资源和旅游资源。不过，因山大沟深、交通不便，长期以来，裕河的经济发展相对缓慢。</p><p>“路没有修好前，有一年我在武都市区参加了一个全省性的会议，会后，省上来的人都到兰州了，我还在回裕河的半路上。”回忆起以前的交通状况时，王松青感慨万千。</p><p>过去十年，陇南公路持续换挡升级。特别是近几年，随着一大批高速公路、国省干线和县乡公路的加快建设，包括裕河在内的武都区各乡镇有了加快发展的硬支撑。</p><p>“现在，沿着高速公路和升级后的县道，两个小时就可以从武都市区到裕河镇。正在修建的钵罗峪梁隧道通车后，时间还能再节省40分钟。”王松青说。</p><p>交通改善了，怎么才能加快发展，成为摆在面前的一道必答题。</p><p>“立足生态资源优势，实现绿色发展。”裕河镇在科学谋划和积极探索中找到答案。</p><p>在武都乃至整个陇南，裕河的生态环境都是数一数二的——这里森林覆盖率高达87%，负氧离子平均含量为每立方米26000个，一些区域甚至达到37000个；境内谷村坐落着国家级自然保护区，动植物资源丰富，拥有金丝猴、大熊猫、林麝、羚牛等珍稀野生动物以及珙桐、红豆杉等珍稀野生植物，各类动植物超过2000种……</p><p>立足生态资源优势，裕河拉开了生态产业化和产业生态化的序幕，茶产业便是其中之一。</p><p>“这里气候好，山清水秀无污染，茶叶的甜度高，口感很好。”在裕河镇陇福春茶厂，生产负责人詹良通说。</p><p>陇福春茶厂是裕河近年来从福建引进的一家集种植、加工、销售为一体的茶产业项目。它的到来，改变了当地长期以来茶叶加工主要依靠手工的历史，同时也将采茶时间由以前的春季变为一年四季，既提升了当地茶产业的加工能力，又提升了茶业总产量，增加了茶农收入。如今，裕河茶叶种植总面积达到了1.8万多亩，茶产业已成为群众增收致富的重要途径。</p><p>立足生态资源优势，裕河还在积极谋划做强做大文旅康养产业。</p><p>“通过加快开发白沙沟、八福沟两大景区，打造‘万家灯火’景观，吸引更多的旅客来裕河休闲旅游观光，进一步带动特色农业产业发展。”王松青说。</p><p>裕河及张坝的发展也是武都实现绿色崛起的缩影。</p><p>十年来，武都严守生态保护红线，因地制宜发展绿色有机产业、金丝崖蜜、休闲农业等产业，积极探索把生态优势转化为经济优势的新路径。以茶产业为例，目前，全区茶叶种植面积近3.25万亩，引进了包括陇福春茶厂在内的4家茶叶加工企业，成立各类茶产业农民合作社11家，茶产业年生产总值超过1亿元。</p><p>与此同时，武都区还进一步挖掘区域内自然山水、历史人文、田园村镇、特色风物、茶园观光等旅游资源，谋划实施了以五马镇、裕河镇为核心，辐射琵琶、洛塘、枫相等乡镇的裕河景区建设项目，着力发展文旅康养产业，打造功能复合、配套完善的生态文化旅游区和“一站式”旅游目的地。</p><p>“随着‘双碳’目标的提出，武都正突出创新驱动，拓宽‘两山’转化渠道，积极打造全国碳汇储备基地和碳汇项目储备区，做大做强碳汇产业。”武都区相关负责人表示。武都绿色发展的路越走越宽。</p>";
      setHtml(resp);
    }, 1500);
  };

  useEffect(() => {
    if (html) {
      // check();
    }
  }, [html]);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  // 找到错误点
  const check = async () => {
    const nodes = editor?.children;
    if (!nodes || nodes?.length <= 0) {
      return false;
    }
    const findedErrs = await serverCheck();
    const errNodeInfo = nodes.map((it, i) => lineCompare(it, i, findedErrs)).filter((it) => it.errids.length);
    setErrList(errNodeInfo);
  };

  const lineCompare = (nodeLine, nodeLineIndex, errList) => {
    const { children } = nodeLine;
    // 拼装段落
    const linetext = children.map((it) => it.text).join("");
    const errids = [];
    for (let i = 0; i < errList.length; i++) {
      const errItem = errList[i];
      if (linetext.indexOf(errItem.line) !== -1) {
        errids.push(errItem);
      }
    }
    return { node: nodeLine, nodeLineIndex, errids };
  };

  const setErrorWord = async () => {
    const nodes = editor?.children;
    if (!nodes || nodes?.length <= 0) {
      return false;
    }
    const operrlist = JSON.parse(JSON.stringify(errlist));
    const updateErrList = [];
    operrlist.map(({ node, errids, nodeLineIndex }) => {
      errids.map((it) => {
        // 确认 errval 所在 children
        const el = textCompare(node, it);
        updateErrList.push({
          ...it,
          nodeLineIndex,
          node,
          el,
        });
      });
    });
    console.log("updateErrList", updateErrList);
    const newNodes = updateErrList.map((it) => updateNode(it));
  };

  const textCompare = (node, err) => {
    const errLineIndex = err.cloume;
    const { children } = node;
    const textLengths = children.map((it) => {
      return it.text.length;
    });
    textLengths.reduce((a, b, i) => {
      textLengths[i] = a + b - 1;
      return a + b;
    }, 0);
    let el = 0;
    for (let i = 0; i <= textLengths.length; i++) {
      if (errLineIndex <= textLengths[i]) {
        el = i;
      }
    }
    if (el > 0) {
      // 存在截取，需要更新 line
      err.cloume = err.cloume - textLengths[el - 1] - 1;
      err.line = children[el].text;
    }
    return el;
  };

  const updateNode = (data) => {
    const { line, errVal, node, el, cloume } = data;
    // 生产新目标节点
    const total = node.children[el].text.split(line);
    const head = { text: total[0] + line.substring(0, cloume) };
    const footer = { text: line.substring(cloume + errVal.length, line.length) + total[1] };
    const newLine = { text: errVal };
    // 替换目标节点
    // console.log("node1", node.children[el]);
    // console.log("head, newLine, footer", head, newLine, footer);
    // console.log("----------------------");
    // node.children.splice(el, 1, head, newLine, footer);
    // console.log("node2", node);
  };

  const deltext = (str, count, val) => {
    const arr = str.split(val);
    const l = arr.length - 1;
    arr.splice(count + 1, 0, val);
    return arr.join("");
  };

  const getSameDataIndex = (data, arr) => {
    let count = 0,
      last = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].errVal === data) {
        count += 1;
        last = arr[i];
      }
    }
    return { count, previousOne: last };
  };

  const upDateAll = async () => {
    for (let item of findsErr) {
      await new Promise((res, rej) => {
        editor.select(item.position);
        editor.deleteFragment();
        editor.dangerouslyInsertHtml(item.rightVal);
        res();
      }).then(() => {
        editor.deselect();
      });
    }
    setFindsErr([]);
  };

  const updateItem = async (item) => {
    const arr = JSON.parse(JSON.stringify(findsErr));
    await new Promise((res, rej) => {
      editor.select(item.position);
      editor.removeMark("color");
      editor.removeMark("bgColor");
      editor.insertText(item.rightVal);
      res();
    }).then(() => {
      editor.deselect();
      const index = arr.findIndex((it) => it.id == item.id);
      arr.splice(index, 1);
      setFindsErr(arr);
    });
  };

  const getposition = async (item) => {
    await new Promise((res, rej) => {
      editor.select(item.position);
      editor.addMark("bgColor", "#ffff00");
      res();
    }).then(() => {
      clearBg();
      editor.deselect();
    });
  };

  const clearBg = async () => {
    for (let item of findsErr) {
      await new Promise((res, rej) => {
        editor.select(item.position);
        editor.removeMark("bgColor");
        res();
      }).then(() => {
        editor.deselect();
      });
    }
  };

  const errListPostion = (val) => {
    seterrActive(val.id);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #ccc",
          zIndex: 100,
          width: "65%",
          float: "left",
        }}
      >
        <Toolbar editor={editor} {...editConfig} mode="default" style={{ borderBottom: "1px solid #ccc" }} />
        <Editor
          value={html}
          onCreated={init}
          onChange={(editor) => {
            const html = editor.getHtml();
            setHtml(html);
          }}
          mode="simple"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
      <div style={{ width: "30%", float: "right" }}>
        <div>
          <button onClick={check}>检查（初始化已执行，调试使用）</button>
          <button onClick={setErrorWord}>标错</button>
          <button onClick={upDateAll}>改错（ALL）</button>
        </div>
        <div>
          {findsErr.map((it) => (
            <div key={it.id} style={{ color: errActive == it.id ? "red" : "" }}>
              {it.errVal} : {it.rightVal}
              <button onClick={() => getposition(it)}>定</button>
              <button onClick={() => updateItem(it)}>改</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyEditor;
