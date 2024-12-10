const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Bh9Jxj4W.js","assets/use-llm-Kc_COJca.js","assets/index-Bs2EL0Mm.js","assets/index-DAbXUXm9.css","assets/routes-Q3DgWzwS.js","assets/index-Bswv7jYP.js","assets/objectWithoutPropertiesLoose-CoJdz_cg.js","assets/index-CVYZ3LYG.js","assets/index-Dl2bfRQj.css"])))=>i.map(i=>d[i]);
import { c as createContextScope, r as reactExports, j as jsxRuntimeExports, P as Primitive, i as useCallbackRef, u as useLayoutEffect2, g as cn, h as cva, s as useSessionState, $ as useLocalLLMState, y as getRepository, ai as useLocalEmbeddingState, Y as FlowNodeTypeEnum, ah as SystemMessage, ad as HumanMessage, af as AIMessage, p as useTranslation, _ as __vitePreload, L as LazyIcon, ak as textToSpeech, as as nanoid, E as DefaultLoader, __tla as __tla_0 } from "./index-Bs2EL0Mm.js";
import { B as Button, a1 as Sidebar, a2 as SidebarContent, a3 as SidebarGroup, a4 as SidebarMenu, a5 as SidebarMenuItem, a6 as SidebarMenuButton, a7 as SidebarProvider, a8 as SidebarInset, __tla as __tla_1 } from "./routes-Q3DgWzwS.js";
import { u as useChat, __tla as __tla_2 } from "./index-BQH3pFhd.js";
import { ap as findFlowNodesWithSource, I as In, L as LLMStatusEnum, t as useLocalLLM, F as FlowNodePlaceholderTypeEnum, j as LLMIcon, A as Alert, o as AlertTitle, k as LLMInfo, q as AIInput, __tla as __tla_3 } from "./use-llm-Kc_COJca.js";
import Copy, { __tla as __tla_4 } from "./copy-ALodIprG.js";
import RefreshCcw, { __tla as __tla_5 } from "./refresh-ccw-m-iSj44n.js";
import Volume2, { __tla as __tla_6 } from "./volume-2-D2EG3p1s.js";
import { __tla as __tla_7 } from "./createLucideIcon-DZXM6zSt.js";
let ApplicationPage;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_6;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_7;
    } catch {
    }
  })()
]).then(async () => {
  var AVATAR_NAME = "Avatar";
  var [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
  var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
  var Avatar$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return jsxRuntimeExports.jsx(AvatarProvider, {
      scope: __scopeAvatar,
      imageLoadingStatus,
      onImageLoadingStatusChange: setImageLoadingStatus,
      children: jsxRuntimeExports.jsx(Primitive.span, {
        ...avatarProps,
        ref: forwardedRef
      })
    });
  });
  Avatar$1.displayName = AVATAR_NAME;
  var IMAGE_NAME = "AvatarImage";
  var AvatarImage$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps.referrerPolicy);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [
      imageLoadingStatus,
      handleLoadingStatusChange
    ]);
    return imageLoadingStatus === "loaded" ? jsxRuntimeExports.jsx(Primitive.img, {
      ...imageProps,
      ref: forwardedRef,
      src
    }) : null;
  });
  AvatarImage$1.displayName = IMAGE_NAME;
  var FALLBACK_NAME = "AvatarFallback";
  var AvatarFallback$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [
      delayMs
    ]);
    return canRender && context.imageLoadingStatus !== "loaded" ? jsxRuntimeExports.jsx(Primitive.span, {
      ...fallbackProps,
      ref: forwardedRef
    }) : null;
  });
  AvatarFallback$1.displayName = FALLBACK_NAME;
  function useImageLoadingStatus(src, referrerPolicy) {
    const [loadingStatus, setLoadingStatus] = reactExports.useState("idle");
    useLayoutEffect2(() => {
      if (!src) {
        setLoadingStatus("error");
        return;
      }
      let isMounted = true;
      const image = new window.Image();
      const updateStatus = (status) => () => {
        if (!isMounted) return;
        setLoadingStatus(status);
      };
      setLoadingStatus("loading");
      image.onload = updateStatus("loaded");
      image.onerror = updateStatus("error");
      image.src = src;
      if (referrerPolicy) {
        image.referrerPolicy = referrerPolicy;
      }
      return () => {
        isMounted = false;
      };
    }, [
      src,
      referrerPolicy
    ]);
    return loadingStatus;
  }
  var Root = Avatar$1;
  var Image = AvatarImage$1;
  var Fallback = AvatarFallback$1;
  const Avatar = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Root, {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }));
  Avatar.displayName = Root.displayName;
  const AvatarImage = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Image, {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }));
  AvatarImage.displayName = Image.displayName;
  const AvatarFallback = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Fallback, {
    ref,
    className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
    ...props
  }));
  AvatarFallback.displayName = Fallback.displayName;
  function MessageLoading() {
    return jsxRuntimeExports.jsxs("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: "text-foreground",
      children: [
        jsxRuntimeExports.jsx("circle", {
          cx: "4",
          cy: "12",
          r: "2",
          fill: "currentColor",
          children: jsxRuntimeExports.jsx("animate", {
            id: "spinner_qFRN",
            begin: "0;spinner_OcgL.end+0.25s",
            attributeName: "cy",
            calcMode: "spline",
            dur: "0.6s",
            values: "12;6;12",
            keySplines: ".33,.66,.66,1;.33,0,.66,.33"
          })
        }),
        jsxRuntimeExports.jsx("circle", {
          cx: "12",
          cy: "12",
          r: "2",
          fill: "currentColor",
          children: jsxRuntimeExports.jsx("animate", {
            begin: "spinner_qFRN.begin+0.1s",
            attributeName: "cy",
            calcMode: "spline",
            dur: "0.6s",
            values: "12;6;12",
            keySplines: ".33,.66,.66,1;.33,0,.66,.33"
          })
        }),
        jsxRuntimeExports.jsx("circle", {
          cx: "20",
          cy: "12",
          r: "2",
          fill: "currentColor",
          children: jsxRuntimeExports.jsx("animate", {
            id: "spinner_OcgL",
            begin: "spinner_qFRN.begin+0.2s",
            attributeName: "cy",
            calcMode: "spline",
            dur: "0.6s",
            values: "12;6;12",
            keySplines: ".33,.66,.66,1;.33,0,.66,.33"
          })
        })
      ]
    });
  }
  const chatBubbleVariant = cva("flex gap-2 max-w-[60%] items-end relative group", {
    variants: {
      variant: {
        received: "self-start",
        sent: "self-end flex-row-reverse"
      },
      layout: {
        default: "",
        ai: "max-w-full w-full items-center"
      }
    },
    defaultVariants: {
      variant: "received",
      layout: "default"
    }
  });
  const ChatBubble = reactExports.forwardRef(({ className, variant, layout, children, ...props }, ref) => jsxRuntimeExports.jsx("div", {
    className: cn(chatBubbleVariant({
      variant,
      layout,
      className
    }), "relative group"),
    ref,
    ...props,
    children: reactExports.Children.map(children, (child) => reactExports.isValidElement(child) && typeof child.type !== "string" ? reactExports.cloneElement(child, {
      variant,
      layout
    }) : child)
  }));
  ChatBubble.displayName = "ChatBubble";
  const ChatBubbleAvatar = ({ src, fallback, className }) => jsxRuntimeExports.jsxs(Avatar, {
    className,
    children: [
      jsxRuntimeExports.jsx(AvatarImage, {
        src,
        alt: "Avatar"
      }),
      jsxRuntimeExports.jsx(AvatarFallback, {
        children: fallback
      })
    ]
  });
  const chatBubbleMessageVariants = cva("p-4", {
    variants: {
      variant: {
        received: "bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg",
        sent: "bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg"
      },
      layout: {
        default: "",
        ai: "border-t w-full rounded-none bg-transparent"
      }
    },
    defaultVariants: {
      variant: "received",
      layout: "default"
    }
  });
  const ChatBubbleMessage = reactExports.forwardRef(({ className, variant, layout, isLoading = false, children, ...props }, ref) => jsxRuntimeExports.jsx("div", {
    className: cn(chatBubbleMessageVariants({
      variant,
      layout,
      className
    }), "break-words max-w-full whitespace-pre-wrap"),
    ref,
    ...props,
    children: isLoading ? jsxRuntimeExports.jsx("div", {
      className: "flex items-center space-x-2",
      children: jsxRuntimeExports.jsx(MessageLoading, {})
    }) : children
  }));
  ChatBubbleMessage.displayName = "ChatBubbleMessage";
  const ChatBubbleAction = ({ icon, onClick, className, variant = "ghost", size = "icon", ...props }) => jsxRuntimeExports.jsx(Button, {
    variant,
    size,
    className,
    onClick,
    ...props,
    children: icon
  });
  const ChatBubbleActionWrapper = reactExports.forwardRef(({ variant, className, children, ...props }, ref) => jsxRuntimeExports.jsx("div", {
    ref,
    className: cn("absolute top-1/2 -translate-y-1/2 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200", variant === "sent" ? "-left-1 -translate-x-full flex-row-reverse" : "-right-1 translate-x-full", className),
    ...props,
    children
  }));
  ChatBubbleActionWrapper.displayName = "ChatBubbleActionWrapper";
  const ChatMessageList = reactExports.forwardRef(({ className, children, ...props }, ref) => jsxRuntimeExports.jsx("div", {
    className: cn("flex flex-col w-full h-full p-4 gap-6 overflow-y-auto", className),
    ref,
    ...props,
    children
  }));
  ChatMessageList.displayName = "ChatMessageList";
  const useChatApplicationData = () => {
    var _a;
    const [chatInfo, setChatInfo] = reactExports.useState();
    const [threadInfo, setThreadInfo] = reactExports.useState();
    const [mainLLMInfo, setLLMInfo] = reactExports.useState();
    const [currentDataNode, setCurrentDataNode] = reactExports.useState();
    const onThreadMessagesLoadedRef = reactExports.useRef();
    const sessionHandleStatus = reactExports.useRef({});
    const currentSession = useSessionState((state) => state.currentSession);
    const loadModel = useLocalLLMState((state) => state.loadModel);
    const getChatApplicationData = reactExports.useCallback(async () => {
      var _a2, _b;
      try {
        sessionHandleStatus.current.handling = currentSession == null ? void 0 : currentSession.id;
        if (!(currentSession == null ? void 0 : currentSession.id) || !(currentSession == null ? void 0 : currentSession.main_source_id) || (currentSession == null ? void 0 : currentSession.main_source_type) !== "Thread") {
          return;
        }
        const [thread, threadNode] = await Promise.all([
          getRepository("Thread").findOne({
            where: {
              id: currentSession.main_source_id,
              session_id: currentSession.id
            }
          }),
          getRepository("FlowNode").findOne({
            where: {
              source_id: currentSession.main_source_id,
              source_type: "Thread",
              session_id: currentSession.id
            }
          })
        ]);
        if (!thread || !threadNode) {
          return;
        }
        const threadConnections = await getRepository("FlowEdge").find({
          where: {
            session_id: currentSession.id,
            target: threadNode.id
          }
        });
        const { flowNodes, flowNodeDatas } = await findFlowNodesWithSource({
          where: {
            session_id: currentSession.id,
            id: In(threadConnections.map((connection) => connection.source))
          }
        });
        const allConnections = await getRepository("FlowEdge").find({
          where: {
            session_id: currentSession.id
          }
        });
        const threadConnectedNodes = allConnections.filter((connection) => connection.target === threadNode.id).map((connection) => {
          var _a3;
          const node = flowNodes.find((node2) => node2.id === connection.source);
          return {
            connection,
            source: node,
            entity: (_a3 = flowNodeDatas == null ? void 0 : flowNodeDatas[node.source_type]) == null ? void 0 : _a3.find((nodeData) => nodeData.id === node.source_id)
          };
        });
        const llmInfo = threadConnectedNodes.find((node) => node.source.source_type === "LLM");
        const promptInfo = threadConnectedNodes.filter((node) => node.source.source_type === "Prompt");
        const schemaInfo = threadConnectedNodes.find((node) => node.source.source_type === "Schema");
        if (!(llmInfo == null ? void 0 : llmInfo.entity)) {
          return;
        }
        const threadData = await getRepository("FlowEdge").findOne({
          where: {
            session_id: currentSession.id,
            source: threadNode.id
          },
          order: {
            id: "DESC"
          }
        });
        if (!threadData) {
          const jsonData = await getRepository("JSONData").save({
            headers: "item",
            session_id: currentSession.id,
            json: "",
            data: []
          });
          if (!jsonData) {
            return;
          }
          const jsonDataNode = await getRepository("FlowNode").save({
            session_id: currentSession.id,
            source_id: jsonData.id,
            source_type: "JSONData",
            node_type: "JSON_DATA",
            x: 0,
            y: 0
          });
          if (!jsonDataNode) {
            return;
          }
          await getRepository("FlowEdge").save({
            session_id: currentSession.id,
            source: threadNode.id,
            target: jsonDataNode.id
          });
          (_a2 = onThreadMessagesLoadedRef.current) == null ? void 0 : _a2.call(onThreadMessagesLoadedRef, []);
          setCurrentDataNode({
            node: jsonDataNode,
            enity: jsonData
          });
        } else {
          const dataNode = await getRepository("FlowNode").findOne({
            where: {
              id: threadData.target,
              session_id: currentSession.id
            }
          });
          if (!dataNode) {
            return;
          }
          const jsonData = await getRepository("JSONData").findOne({
            where: {
              id: dataNode.source_id,
              session_id: currentSession.id
            }
          });
          if (!jsonData) {
            return;
          }
          (_b = onThreadMessagesLoadedRef.current) == null ? void 0 : _b.call(onThreadMessagesLoadedRef, jsonData.data);
          setCurrentDataNode({
            node: dataNode,
            enity: jsonData
          });
        }
        setLLMInfo({
          llm: llmInfo.entity,
          status: LLMStatusEnum.Started,
          progress: ""
        });
        setThreadInfo({
          thread,
          threadNode
        });
        setChatInfo({
          prompts: (promptInfo == null ? void 0 : promptInfo.map((info) => info.entity)) || [],
          schema: schemaInfo == null ? void 0 : schemaInfo.entity
        });
        sessionHandleStatus.current.handled = currentSession.id;
      } finally {
        sessionHandleStatus.current.handling = void 0;
      }
    }, [
      currentSession == null ? void 0 : currentSession.id,
      currentSession == null ? void 0 : currentSession.main_source_id,
      currentSession == null ? void 0 : currentSession.main_source_type
    ]);
    const loadLLM = reactExports.useCallback(async () => {
      if (!(mainLLMInfo == null ? void 0 : mainLLMInfo.llm.name)) {
        return;
      }
      try {
        setLLMInfo((pre) => pre ? {
          ...pre,
          status: LLMStatusEnum.Loading
        } : pre);
        await loadModel(mainLLMInfo == null ? void 0 : mainLLMInfo.llm.name, (data) => {
          setLLMInfo((pre) => pre ? {
            ...pre,
            progress: data.text
          } : pre);
        });
        setLLMInfo((pre) => pre ? {
          ...pre,
          status: LLMStatusEnum.Loaded,
          progress: ""
        } : pre);
      } catch {
        setLLMInfo((pre) => pre ? {
          ...pre,
          status: LLMStatusEnum.Started,
          progress: ""
        } : pre);
      }
    }, [
      (_a = mainLLMInfo == null ? void 0 : mainLLMInfo.llm) == null ? void 0 : _a.name,
      loadModel
    ]);
    const onThreadMessagesLoaded = reactExports.useCallback((callback) => {
      onThreadMessagesLoadedRef.current = callback;
      return () => {
        onThreadMessagesLoadedRef.current = void 0;
      };
    }, []);
    const updateMessagesData = reactExports.useCallback(async (messages) => {
      if (!(currentDataNode == null ? void 0 : currentDataNode.node) || !(currentDataNode == null ? void 0 : currentDataNode.enity)) {
        return;
      }
      await getRepository("JSONData").save({
        ...currentDataNode.enity,
        data: messages
      });
    }, [
      currentDataNode == null ? void 0 : currentDataNode.enity,
      currentDataNode == null ? void 0 : currentDataNode.node
    ]);
    reactExports.useEffect(() => {
      if (sessionHandleStatus.current.handling || (sessionHandleStatus == null ? void 0 : sessionHandleStatus.current.handled) === (currentSession == null ? void 0 : currentSession.id)) {
        return;
      }
      getChatApplicationData();
    }, [
      currentSession == null ? void 0 : currentSession.id,
      getChatApplicationData
    ]);
    return {
      ...chatInfo,
      loadLLM,
      threadInfo,
      mainLLMInfo,
      currentDataNode,
      updateMessagesData,
      onThreadMessagesLoaded
    };
  };
  const useSendMessage = () => {
    const [loading] = reactExports.useState(false);
    const similaritySearchWithScore = useLocalEmbeddingState((state) => state.similaritySearchWithScore);
    const { stream } = useLocalLLM();
    const handlePlaceholders = reactExports.useCallback(async (content, threadConnection) => {
      const { placeholders } = threadConnection || {};
      if (!(placeholders == null ? void 0 : placeholders.length)) {
        return [];
      }
      const injectedMessages = [];
      await Promise.all(placeholders.map(async (item) => {
        var _a, _b, _c, _d, _e, _f;
        const placeholderRecord = (_a = item.node.data) == null ? void 0 : _a.entity;
        if (!placeholderRecord) {
          return;
        }
        switch (placeholderRecord.placeholder_type) {
          case FlowNodePlaceholderTypeEnum.VECTOR_DATABASE_RETREIVER: {
            const vectorNode = (_b = item.connectedNodes) == null ? void 0 : _b.find((node) => node.type === FlowNodeTypeEnum.VectorDatabase);
            const vector = (_c = vectorNode == null ? void 0 : vectorNode.data) == null ? void 0 : _c.entity;
            const prompt = (_f = (_e = (_d = item.connectedNodes) == null ? void 0 : _d.find((node) => node.type === FlowNodeTypeEnum.Prompt)) == null ? void 0 : _e.data) == null ? void 0 : _f.entity;
            if (!prompt || !vector || !vectorNode) {
              return;
            }
            {
              return;
            }
          }
        }
      }));
      return injectedMessages;
    }, [
      similaritySearchWithScore
    ]);
    const sendMessage = reactExports.useCallback(async (message, messages, threadConnection, _threadConversionNodes, { onMessageUpdate }) => {
      const { tools, schemas, placeholders } = threadConnection || {};
      const injectedMessages = [];
      if (placeholders == null ? void 0 : placeholders.length) {
        injectedMessages.push(...await handlePlaceholders(message, threadConnection));
      }
      const formatedMessages = messages.map((message2) => {
        if (message2.role === "system") {
          return new SystemMessage(message2.content);
        }
        if (message2.role === "user") {
          return new HumanMessage(message2.content);
        }
        return new AIMessage(message2.content);
      });
      const { content } = await stream(formatedMessages, {
        tools,
        schemas,
        onMessageUpdate: ({ content: content2 }) => {
          onMessageUpdate == null ? void 0 : onMessageUpdate({
            nodeData: {
              loading: true,
              content: content2
            }
          });
        }
      });
      onMessageUpdate == null ? void 0 : onMessageUpdate({
        nodeData: {
          content
        }
      });
      return content;
    }, [
      handlePlaceholders,
      stream
    ]);
    return {
      loading,
      sendMessage
    };
  };
  const ChatLLMInfo = reactExports.memo(({ llm, status, loadLLM, progress }) => {
    const { t } = useTranslation("flows");
    const [llmInfo, setLLMInfo] = reactExports.useState();
    reactExports.useEffect(() => {
      if (llmInfo || !(llm == null ? void 0 : llm.name)) {
        return;
      }
      __vitePreload(() => import("./index-Bh9Jxj4W.js").then(async (m) => {
        await m.__tla;
        return m;
      }), true ? __vite__mapDeps([0,1,2,3,4]) : void 0).then(async ({ hasModelInCache, functionCallingModelIds, prebuiltAppConfig }) => {
        const hasCache = await hasModelInCache(llm == null ? void 0 : llm.name);
        setLLMInfo({
          hasCache,
          isFunctionCalling: functionCallingModelIds.includes(llm == null ? void 0 : llm.name),
          info: prebuiltAppConfig.model_list.find((item) => item.model_id === (llm == null ? void 0 : llm.name))
        });
      });
    }, [
      llm == null ? void 0 : llm.name,
      llmInfo
    ]);
    const handleLoadLLM = reactExports.useCallback(async () => {
      await (loadLLM == null ? void 0 : loadLLM());
    }, [
      loadLLM
    ]);
    const llmIcon = reactExports.useMemo(() => {
      switch (status) {
        case LLMStatusEnum.Downloading:
          return jsxRuntimeExports.jsx(LazyIcon, {
            className: "animate-spin w-7 h-7",
            name: "arrow-big-down-dash"
          });
        case LLMStatusEnum.Loaded:
          return jsxRuntimeExports.jsx(LLMIcon, {
            name: (llm == null ? void 0 : llm.name) || "brain",
            className: "w-7 h-7"
          });
        default:
          return jsxRuntimeExports.jsx(LLMIcon, {
            name: (llm == null ? void 0 : llm.name) || "brain",
            className: "w-7 h-7"
          });
      }
    }, [
      llm == null ? void 0 : llm.name,
      status
    ]);
    return jsxRuntimeExports.jsx(Alert, {
      className: "flex justify-center !border-none !bg-inherit !p-2 max-w-full overflow-y-hidden mb-2",
      children: jsxRuntimeExports.jsxs("div", {
        className: "ml-2 pt-1 max-w-full",
        children: [
          jsxRuntimeExports.jsxs(AlertTitle, {
            className: "flex gap-2 items-center pr-6",
            children: [
              llmIcon,
              `${(llm == null ? void 0 : llm.name) || ""}`
            ]
          }),
          jsxRuntimeExports.jsxs("div", {
            className: "max-w-full mt-2 flex-wrap flex gap-1",
            children: [
              jsxRuntimeExports.jsx(LLMInfo, {
                model: llmInfo == null ? void 0 : llmInfo.info,
                isFunctionCalling: (llmInfo == null ? void 0 : llmInfo.isFunctionCalling) || false,
                name: llm == null ? void 0 : llm.name,
                isCached: (llmInfo == null ? void 0 : llmInfo.hasCache) || false
              }),
              status !== LLMStatusEnum.Loaded ? progress ? jsxRuntimeExports.jsx("div", {
                className: "text-sm break-words flex-wrap",
                children: progress
              }) : jsxRuntimeExports.jsx(Button, {
                disabled: status === LLMStatusEnum.Loading,
                onClick: handleLoadLLM,
                className: "mt-4 w-full",
                children: t((llmInfo == null ? void 0 : llmInfo.hasCache) ? "llm_node.load_model_button" : "llm_node.download_model_button")
              }) : void 0
            ]
          })
        ]
      })
    });
  });
  const useChatList = (threadNode) => {
    const [chatList, setChatList] = reactExports.useState([]);
    const currentSession = useSessionState((state) => state.currentSession);
    const getChatList = reactExports.useCallback(async () => {
      if (!threadNode || !(currentSession == null ? void 0 : currentSession.id)) {
        return;
      }
      const threadDataEdged = await getRepository("FlowEdge").find({
        where: {
          session_id: currentSession.id,
          source: threadNode.id
        },
        order: {
          id: "DESC"
        }
      });
      const { flowNodes, flowNodeDatas } = await findFlowNodesWithSource({
        where: {
          session_id: currentSession.id,
          id: In(threadDataEdged.map((edge) => edge.target)),
          source_type: "JSONData"
        },
        order: {
          updated_at: "DESC"
        },
        select: [
          "id",
          "source_id",
          "source_type",
          "updated_at"
        ]
      });
      setChatList(flowNodes.reduce((all, node) => {
        var _a;
        const entity = (_a = flowNodeDatas[node.source_type]) == null ? void 0 : _a.find((data) => data.id === node.source_id);
        if (entity) {
          all.push({
            node,
            entity
          });
        }
        return all;
      }, []));
    }, [
      currentSession == null ? void 0 : currentSession.id,
      threadNode
    ]);
    reactExports.useEffect(() => {
      if (!threadNode) {
        return;
      }
      getChatList();
    }, [
      getChatList,
      threadNode
    ]);
    return {
      chatList,
      getChatList
    };
  };
  function ChatPanel({ mainLLMInfo, loadLLM, threadNode, currentDataNode, ...props }) {
    const { chatList } = useChatList(threadNode);
    return jsxRuntimeExports.jsxs(Sidebar, {
      variant: "sidebar",
      side: "right",
      collapsible: "none",
      ...props,
      children: [
        jsxRuntimeExports.jsx("div", {
          className: "h-1"
        }),
        jsxRuntimeExports.jsxs(SidebarContent, {
          children: [
            jsxRuntimeExports.jsx(SidebarGroup, {
              className: "flex-1",
              children: jsxRuntimeExports.jsx(SidebarMenu, {
                children: chatList.map(({ node }, index) => {
                  var _a;
                  return jsxRuntimeExports.jsx(SidebarMenuItem, {
                    children: jsxRuntimeExports.jsxs(SidebarMenuButton, {
                      className: "cursor-pointer",
                      children: [
                        jsxRuntimeExports.jsx("span", {
                          children: `Thread ${index + 1}`
                        }),
                        jsxRuntimeExports.jsx(LazyIcon, {
                          name: ((_a = currentDataNode == null ? void 0 : currentDataNode.node) == null ? void 0 : _a.id) === node.id ? "check" : "chevron-right",
                          className: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        })
                      ]
                    })
                  }, node.id);
                })
              })
            }),
            jsxRuntimeExports.jsx(ChatLLMInfo, {
              llm: mainLLMInfo == null ? void 0 : mainLLMInfo.llm,
              status: mainLLMInfo == null ? void 0 : mainLLMInfo.status,
              progress: mainLLMInfo == null ? void 0 : mainLLMInfo.progress,
              loadLLM
            })
          ]
        })
      ]
    });
  }
  const MarkdownPreview = reactExports.lazy(() => __vitePreload(() => import("./index-Bswv7jYP.js").then(async (m) => {
    await m.__tla;
    return m;
  }), true ? __vite__mapDeps([5,6,2,3,7,8]) : void 0));
  const ChatAiIcons = [
    {
      icon: Copy,
      label: "Copy"
    },
    {
      icon: RefreshCcw,
      label: "Refresh"
    },
    {
      icon: Volume2,
      label: "Volume"
    }
  ];
  const ChatApplication = reactExports.memo(() => {
    const isScrolling = reactExports.useRef(false);
    const [isGenerating, setIsGenerating] = reactExports.useState(false);
    const scrollToBottom = reactExports.useCallback(() => {
      setTimeout(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, 50);
    }, []);
    const { threadInfo, mainLLMInfo, currentDataNode, loadLLM, updateMessagesData, onThreadMessagesLoaded } = useChatApplicationData();
    const { sendMessage } = useSendMessage();
    const { input, setInput, messages, handleSubmit, handleInputChange, isLoading, reload, setMessages } = useChat({
      fetch: async (_input, init) => {
        const body = JSON.parse(init == null ? void 0 : init.body);
        const newMessageId = nanoid();
        const lastMessage = body.messages[body.messages.length - 1];
        isScrolling.current = true;
        setMessages((messages2) => [
          ...messages2,
          {
            id: nanoid(),
            content: lastMessage.content,
            role: "user"
          },
          {
            id: newMessageId,
            content: "Thinking...",
            role: "assistant"
          }
        ]);
        await sendMessage(lastMessage.content, body.messages || [], void 0, [], {
          onMessageUpdate(info) {
            setMessages((messages2) => {
              const newMessages = [
                ...messages2
              ];
              const index = newMessages.findIndex((message) => message.id === newMessageId);
              if (index !== -1) {
                newMessages[index] = {
                  ...newMessages[index],
                  content: info.nodeData.content || ""
                };
              }
              return newMessages;
            });
            if (isScrolling.current) {
              scrollToBottom();
            }
          }
        });
        setMessages((messages2) => {
          updateMessagesData(messages2);
          return messages2;
        });
        setIsGenerating(false);
        setInput("");
        if (isScrolling.current) {
          scrollToBottom();
        }
        return new Response();
      }
    });
    const messagesRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      const cleandUp = onThreadMessagesLoaded((messages2) => {
        setMessages(messages2 || []);
        scrollToBottom();
      });
      return () => {
        cleandUp();
      };
    }, [
      setMessages,
      onThreadMessagesLoaded,
      scrollToBottom
    ]);
    const onSubmit = async (_value, e) => {
      setIsGenerating(true);
      await handleSubmit(e);
      return true;
    };
    const handleActionClick = async (action, messageIndex) => {
      if (action === "Refresh") {
        setIsGenerating(true);
        try {
          await reload();
        } catch (error) {
          console.error("Error reloading:", error);
        } finally {
          setIsGenerating(false);
        }
      }
      if (action === "Copy") {
        const message = messages[messageIndex];
        if (message && message.role === "assistant") {
          navigator.clipboard.writeText(message.content);
        }
      }
      if (action === "Volume") {
        const message = messages[messageIndex];
        if (message == null ? void 0 : message.content) {
          await textToSpeech.speak((message == null ? void 0 : message.content) || "");
        }
      }
    };
    const handleStopScroll = reactExports.useCallback(() => isScrolling.current = false, []);
    return jsxRuntimeExports.jsxs(SidebarProvider, {
      onClick: handleStopScroll,
      className: "max-h-full !overflow-hidden !min-h-full",
      style: {
        minHeight: "unset"
      },
      defaultOpen: true,
      children: [
        jsxRuntimeExports.jsx(SidebarInset, {
          className: "!max-h-full !overflow-hidden",
          style: {
            minHeight: "unset"
          },
          children: jsxRuntimeExports.jsxs("main", {
            className: "flex h-full w-full max-w-2xl flex-col items-center mx-auto overflow-hidden",
            children: [
              jsxRuntimeExports.jsx("div", {
                className: "flex-1 overflow-y-auto overflow-x-hidden min-w-full",
                children: jsxRuntimeExports.jsx(ChatMessageList, {
                  className: "!max-h-full",
                  ref: messagesRef,
                  children: messages && messages.map((message, index) => jsxRuntimeExports.jsxs(ChatBubble, {
                    variant: message.role == "user" ? "sent" : "received",
                    children: [
                      message.role !== "user" ? jsxRuntimeExports.jsx(ChatBubbleAvatar, {
                        src: "",
                        fallback: "\u{1F916}"
                      }) : void 0,
                      jsxRuntimeExports.jsxs(ChatBubbleMessage, {
                        children: [
                          jsxRuntimeExports.jsx(reactExports.Suspense, {
                            fallback: jsxRuntimeExports.jsx(MessageLoading, {}),
                            children: jsxRuntimeExports.jsx(MarkdownPreview, {
                              className: "!text-sm [&_p]:leading-relaxed !max-w-full !bg-transparent !text-inherit !font-sans",
                              source: message.content || ""
                            })
                          }),
                          message.role === "assistant" && messages.length - 1 === index && jsxRuntimeExports.jsx("div", {
                            className: "flex items-center mt-1.5 gap-1",
                            children: !isGenerating && jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
                              children: ChatAiIcons.map((icon, iconIndex) => {
                                const Icon = icon.icon;
                                return jsxRuntimeExports.jsx(ChatBubbleAction, {
                                  variant: "ghost",
                                  className: "size-5",
                                  icon: jsxRuntimeExports.jsx(Icon, {
                                    className: "size-3"
                                  }),
                                  onClick: () => handleActionClick(icon.label, index)
                                }, iconIndex);
                              })
                            })
                          })
                        ]
                      })
                    ]
                  }, index))
                })
              }),
              jsxRuntimeExports.jsx(AIInput, {
                className: "!max-w-2xl px-4",
                onSubmit,
                disabled: isLoading || isGenerating || (mainLLMInfo == null ? void 0 : mainLLMInfo.status) !== LLMStatusEnum.Loaded,
                placeholder: "Type your message here...",
                maxHeight: 72,
                value: input,
                onChange: handleInputChange
              })
            ]
          })
        }),
        jsxRuntimeExports.jsx(ChatPanel, {
          currentDataNode,
          threadNode: threadInfo == null ? void 0 : threadInfo.threadNode,
          loadLLM,
          mainLLMInfo
        })
      ]
    });
  });
  const ChatApplication$1 = ChatApplication;
  ApplicationPage = function() {
    const currentSession = useSessionState((state) => state.currentSession);
    if (!currentSession) {
      return jsxRuntimeExports.jsx(DefaultLoader, {
        flickeringGrid: true,
        className: "w-full h-full"
      });
    }
    if (currentSession.main_source_type === "Thread") {
      return jsxRuntimeExports.jsx(ChatApplication$1, {});
    }
    return void 0;
  };
});
export {
  __tla,
  ApplicationPage as default
};
