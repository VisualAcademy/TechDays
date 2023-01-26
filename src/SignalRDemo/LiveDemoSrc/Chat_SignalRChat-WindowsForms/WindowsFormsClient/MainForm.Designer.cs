namespace WindowsFormsClient
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.bnConnect = new System.Windows.Forms.Button();
            this.tbMessage = new System.Windows.Forms.TextBox();
            this.bnSend = new System.Windows.Forms.Button();
            this.messages = new System.Windows.Forms.ListBox();
            this.SuspendLayout();
            // 
            // bnConnect
            // 
            this.bnConnect.Location = new System.Drawing.Point(14, 11);
            this.bnConnect.Name = "bnConnect";
            this.bnConnect.Size = new System.Drawing.Size(495, 21);
            this.bnConnect.TabIndex = 0;
            this.bnConnect.Text = "서버에 연결";
            this.bnConnect.UseVisualStyleBackColor = true;
            this.bnConnect.Click += new System.EventHandler(this.bnConnect_Click);
            // 
            // tbMessage
            // 
            this.tbMessage.Location = new System.Drawing.Point(15, 42);
            this.tbMessage.Name = "tbMessage";
            this.tbMessage.Size = new System.Drawing.Size(376, 21);
            this.tbMessage.TabIndex = 1;
            // 
            // bnSend
            // 
            this.bnSend.Location = new System.Drawing.Point(413, 39);
            this.bnSend.Name = "bnSend";
            this.bnSend.Size = new System.Drawing.Size(96, 21);
            this.bnSend.TabIndex = 2;
            this.bnSend.Text = "전송";
            this.bnSend.UseVisualStyleBackColor = true;
            this.bnSend.Click += new System.EventHandler(this.bnSend_Click);
            // 
            // messages
            // 
            this.messages.FormattingEnabled = true;
            this.messages.ItemHeight = 12;
            this.messages.Location = new System.Drawing.Point(15, 73);
            this.messages.Name = "messages";
            this.messages.Size = new System.Drawing.Size(493, 316);
            this.messages.TabIndex = 3;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(523, 406);
            this.Controls.Add(this.messages);
            this.Controls.Add(this.bnSend);
            this.Controls.Add(this.tbMessage);
            this.Controls.Add(this.bnConnect);
            this.Name = "MainForm";
            this.Text = "SignalR 채팅";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button bnConnect;
        private System.Windows.Forms.TextBox tbMessage;
        private System.Windows.Forms.Button bnSend;
        private System.Windows.Forms.ListBox messages;
    }
}

