using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CrossZeros
{
    public partial class Form1 : Form
    {
        static int N = 5;
        PictureBox[,] pbCells = new PictureBox[N, N];
        int[,] states = new int[N, N];//0-пустая,1-крестик,2-нолик
        int currentPlayer = 0;//0-крестик,1-нолик
        Image cross,zero;

        public Form1()
        {
            InitializeComponent();
        }

        private void pbClick(object sender, EventArgs e)
        {
            string[] names = { "крестики", "нолики" };
            Point pos = (Point)(((PictureBox)sender).Tag);
            if (states[pos.X, pos.Y] > 0) return;
            states[pos.X, pos.Y] = currentPlayer + 1;
            if (currentPlayer == 0) pbCells[pos.X, pos.Y].Image = cross;
            else pbCells[pos.X, pos.Y].Image = zero;
            if (isWinner() || endGame()) {
                string s = (isWinner())? "Победил " + names[currentPlayer]+".": "Ничья!";
                if (MessageBox.Show(s+ " Хотите сыграть заново?", "Конец игры!!!!", MessageBoxButtons.YesNo)
                    == DialogResult.Yes) Start();
                else Application.Exit();
                return;
            }
            currentPlayer ^= 1;
        }

        bool endGame()
        {
            int k = 0;
            for (int i = 0; i < N; i++)
                for (int j = 0; j < N; j++)
                    if (states[i, j] > 0) k++;
            return (k == N * N);
        }

        bool isWinner()
        {
            bool res = false;
            bool flag1, flag2, flag3=true, flag4=true;
            for (int i = 0; i < N; i++) {
                flag1 = true; flag2 = true;
                for (int j = 0; j < N; j++)
                {
                    if (states[i, j] != currentPlayer+1) flag1 = false;
                    if (states[j, i] != currentPlayer+1) flag2 = false;
                }
                res = res || flag1 || flag2;
                if (states[i, i] != currentPlayer+1) flag3 = false;
                if (states[i, N-i-1] != currentPlayer+1) flag4 = false;
            }
            res = res || flag3 || flag4;
            return res;  
        }

        void Init()
        {
            cross = Image.FromFile("cross.png");
            zero = Image.FromFile("zero.png");
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < N; j++) {
                    pbCells[i, j] = new PictureBox
                    {
                        Parent = this,
                        Size = new Size(100, 100),
                        Top = 101 * i + 10,
                        Left = 101 * j + 10,
                        Cursor = Cursors.Hand,
                        Tag=new Point(i,j),
                        BackColor =Color.Black
                    };
                    pbCells[i, j].Click += pbClick;
                }
            }
        }

        void Start()
        {
            for (int i = 0; i < N; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    states[i, j] = 0;
                    pbCells[i, j].Image = null;
                }
            }
            currentPlayer = 0;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Init();
            Start();
        }
    }
}
