import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "@app/store"
import "./index.css"
import App from "./App"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

// [NOTE: good description of variants styling: https://github.com/chakra-ui/chakra-ui/issues/7556]

// Customizing Chakra UI theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
  colors: {
    brand: {
      50: "#F2F2F2",
      100: "#DBDBDB",
      200: "#C4C4C4",
      300: "#ADADAD",
      400: "#969696",
      500: "#7F7F7F",
      600: "#686868",
      700: "#515151",
      800: "#3A3A3A",
      900: "#000000",
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: "brand.900",
              boxShadow: "1px 1px 0px #000000",
            },
          },
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "gray.300",
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
