import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "@app/store"
import "./index.css"
import App from "./App"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import "material-icons/iconfont/material-icons.css"

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
      50: "#E6FFF2",
      100: "#C2FFE0",
      200: "#9DFFCE",
      300: "#78FFBC",
      400: "#53FFAA",
      500: "#6FCF97",
      600: "#59B57F",
      700: "#448B67",
      800: "#2F614F",
      900: "#1A3737",
    },
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          borderRadius: 0,
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: "gray.300",
            _focus: {
              borderColor: "brand.600",
              boxShadow: "none",
            },
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 0,
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: "gray.300",
          },
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "gray.300",
      },
    },
    Button: {
      variants: {
        solid: {
          borderRadius: 0,
          width: "full",
        },
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
