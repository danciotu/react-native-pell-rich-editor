import { WebViewProps } from "react-native-webview";
import { StyleProp, ViewStyle } from "react-native";
import { actions } from "./src/const";

declare module "react-native-pell-rich-editor" {
  /** The RichTextEditor accepts all props from Webview */
  declare interface RichEditorProps extends WebViewProps {
    /**
     * Used for placement of editor
     */
    contentInset?: { top: number; bottom: number };

    backgroundColor?: string;
    /**
     * Color for the text inside the editor.
     * Default is black
     */
    textColor?: string;
    /**
     * Editor is focused when mounted.
     * Default is false
     */
    autoFocus?: boolean;

    /**
     * Wrap the editor webview inside a container.
     * Default is true
     */
    useContainer?: boolean;
    /**
     * Styling for container or for Webview depending on useContainer prop
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Initial content to be rendered inside WebView
     */
    initialContentHTML?: string;

    /**
     * Callback called after the editor has been initialized
     */
    editorInitializedCallback?: () => void;
  }

  declare type SelectionChangeListener = (items: string[]) => void;

  declare type DefaultActions = [
    "image",
    "bold",
    "italic",
    "unorderedList",
    "orderedList",
    "link"
  ];

  declare class RichEditor extends React.Component<RichEditorProps> {
    // Public API

    getContentHtml: () => Promise<string>;

    registerToolbar: (listener: SelectionChangeListener) => void;

    /** Add a listener for the content focused event in WebView */
    setContentFocusHandler: (listener: () => void) => void;

    /**
     * Set current HTML to be rendered
     */
    setContentHTML: (html: string) => void;

    blurContentEditor: () => void;

    focusContentEditor: () => void;

    insertImage: (attributes: any) => void;

    init: () => void;
  }

  declare interface RichToolbarProps {
    /**
     * Function that returns a reference to the RichEditor instance
     */
    getEditor: () => RichEditor;

    unselectedButtonStyle?: StyleProp<ViewStyle>;
    selectedButtonStyle?: StyleProp<ViewStyle>;

    /**
     * Color for selected button Icon
     */
    selectedIconTint?: string;
    /**
     * Color for unselected button Icon
     */
    iconTint?: string;
    /**
     * Custom renderer for toolbar actions
     */
    renderAction?: (action: string, selected: boolean) => JSX.Element;

    /**
     * Custom style prop for the toolbar
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Your own set if images for the toolbar
     */
    iconMap?: Record<string, ImageSourcePropType>;

    /**
     * Logic for what happens when you press on the add image button
     * */
    onPressAddImage?: () => void;

    /**
     * Custom actions you want the toolbar to permit.
     * By default the toolbar permits an Action set of type DefaultActions
     */
    actions?: Partial<DefaultActions> | string[];
  }

  declare class RichToolbar extends React.Component<RichToolbarProps> {}

  export = {
    RichToolbar,
    RichEditor,
    actions
  };
}
