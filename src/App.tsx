const App = () => {
  return (
    <Provider store = { store }>
      <RouterProvider router = { router } />
    </Provider>
  )
}

export default App;