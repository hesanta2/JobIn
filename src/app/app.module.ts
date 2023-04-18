import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './ui/components/search/search.component';
import { GraphComponent } from './ui/components/shared/graph/graph.component';
import { MainComponent } from './ui/pages/main/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    GraphComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    GraphComponent
  ]
})
export class AppModule { }
