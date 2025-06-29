import { render, screen, act } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
  it("displays the next slide after 5 seconds", async () => {
    jest.useFakeTimers();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    const slides = await screen.findAllByTestId("Card-Slide");
    expect(slides[0]).toBeInTheDocument();
    await act(async () => {
      jest.advanceTimersByTime(5000);
    });
    expect(slides[1].className).toContain("display");
    expect(slides[0].className).not.toContain("display");
  });
  it("automatically cycles through slides in the correct order", async () => {
    jest.useFakeTimers();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    const radioDot = await screen.findAllByRole("radio");
    expect(radioDot[0]).toBeChecked();

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });
    expect(radioDot[1]).toBeChecked();
    expect(radioDot[0]).not.toBeChecked();

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });
    expect(radioDot[2]).toBeChecked();
    expect(radioDot.length).toBe(data.focus.length);
  });
});
