import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Racemodel } from 'src/app/models/race/racemodel';
import { Chart } from "chart.js";

@Component({
  selector: 'app-racestats',
  templateUrl: './racestats.page.html',
  styleUrls: ['./racestats.page.scss'],
})
export class RacestatsPage implements OnInit {
  
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("bubbleCanvas") bubbleCanvas: ElementRef;
  
  private races: Racemodel[];
  private data: raceData[] = [];
  private barChart: Chart;
  private bubbleChart: Chart;
  private labels: string[] = [];
  private count: number[] = [];
  private backGroundColors: string[] = [];

  private bubbleData = [];

  constructor(private http: HttpService) { }

  async ngOnInit() {
    console.log('Executing');
    await this.http.setOptionsAsync();
    console.log(this.http.headers);
    this.http.get('/races').subscribe( (_races: Racemodel[]) => { 
      this.races = _races;
      this.getData();
      this.barChartGenerator();
      this.setBubbleData();
      this.bubbleChartGenerator();
    });
  }

  getData = () => {
    this.races.forEach(race => {
      const subsData: raceData = {
        title: race.title,
        subscriptions: race.subscribers.length,
        distance: race.distance,
        lat: race.startingPoint.coordinates[0],
        long: race.startingPoint.coordinates[1]
      }
    this.data.push(subsData);
    this.labels.push(race.title);
    this.count.push(race.subscribers.length);
    console.log('DATA', subsData);
    });
  }
  randomRgba = () => {
    const r: number = Math.floor(Math.random() * Math.floor(255));
    const g: number = Math.floor(Math.random() * Math.floor(255));
    const b: number = Math.floor(Math.random() * Math.floor(255));
    const color: string = `rgba(${r}, ${g}, ${b}, 0.7)`;
    return color;
  }

  setColors = () => {
    this.races.forEach(_ => {
      this.backGroundColors.push(this.randomRgba());
    });
  }

  barChartGenerator = () => {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Races subscriptions",
            data: this.count,
            backgroundColor: this.randomRgba,
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Races in function of its subscribers'
        }, 
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        legend: {
          display: false
      },
      tooltips: {
          callbacks: {
             label: function(tooltipItem) {
                    return tooltipItem.yLabel;
             }
          }
      }
      }
    });
  }

  bubbleChartGenerator = () => {
    this.bubbleChart = new Chart(this.bubbleCanvas.nativeElement, {
      type: 'bubble',
      data: {
        labels: "Bubble Chart",
        datasets: this.bubbleData
      },
      options: {
        title: {
          display: true,
          text: 'Races in function of its starting point and distance'
        }, 
        scales: {
          xAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Latitud"
            },
            ticks: {
              min: 0,
              max: 4,
              maxTicksLimit: 20,
              stepSize: 0.1
            }
          }],
          yAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Longitud"
            },
            ticks: {
              min: 15,
              max: 65,
              maxTicksLimit: 20,
              stepSize: 0.1
            }
          }]
        }
      }
    });
  }

  setBubbleData = () => {
    console.log('setting bubble data');
    this.data.forEach(race => {
      var data = {
        label: [race.title],
        backgroundColor: this.randomRgba(),
        data: [{
          x: race.lat,
          y: race.long,
          r: race.distance*10
        }]
      }
      this.bubbleData.push(data);    
    });
  }
}

interface raceData {
  title: string, 
  subscriptions: number,
  distance: number
  lat?: number, 
  long?: number
}
